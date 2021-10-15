const {Router} = require('express');
const error = require('./services/error');
const {check, validationResult} = require('express-validator');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth.middleware');
const abilities = require('../middleware/comment.abilities');
const router = Router();

router.get('/:taskId',
    auth,
    abilities,
    async (req, res) => {
        try {
            const taskId = req.params.taskId;
            const comments = await Comment.find({taskId});
            const allowedComments = comments.filter(comment => req.ability.can('read', comment));
            return res.status(200).json({comments: allowedComments});
        } catch (e) {
            error(e, res);
        }
    });

module.exports = router;
