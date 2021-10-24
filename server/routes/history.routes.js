const {Router} = require('express');
const auth = require('../middleware/auth.middleware');
const History = require('../models/History');
const error = require("./services/error");
const abilities = require('../middleware/task.abilities');
const router = Router();

router.get('/:taskId',
    auth,
    abilities,
    async (req, res) => {
        try {
            const taskId = req.params.taskId;
            if (!req.ability.can('read', 'Task')) {
                return res.status(403).json('Forbidden');
            }

            const histories = await History.find({taskId});
            return res.status(201).json({history: histories || []});
        } catch (e) {
            error(e, res);
        }
    });

module.exports = router;
