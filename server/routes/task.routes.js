const {Router} = require('express');
const error = require('./services/error');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const Task = require('../models/Task');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/task/:id',
    auth,
    async (req, res) => {
        try {
            if (req.params.id) {
                const task = await Task.findOne({_id: req.params.id});
                if (req.ability.can('read', task)) {
                    return res.status(200).json(task);
                }
                return res.status(403).json('Forbidden');
            } else {
                res.status(500).json({
                    message: 'No task id'
                });
            }
        } catch (e) {
            error(e, res);
        }
    }
)

module.exports = router;
