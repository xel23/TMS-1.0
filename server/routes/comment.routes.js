const {Router} = require('express');
const error = require('./services/error');
const {check, validationResult} = require('express-validator');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth.middleware');
const abilities = require('../middleware/comment.abilities');
const Task = require("../models/Task");
const router = Router();

router.post('/',
    auth,
    abilities,
    [
        check('taskId', 'Task id error').exists().isString(),
        check('text', 'Text error').exists().isString(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({
                    errors: errors[0],
                    message: 'Incorrect request'
                })
            }

            if (!req.ability.can('create', 'Comment')) {
                return res.status(403).json('Forbidden');
            }

            const task = await Task.findOne({_id: taskId});

            if (!task) {
                return res.status(404).json('Not Found');
            }

            const {taskId, text, author} = req.body;
            const user = req.user;
            const comment = new Comment({taskId, text, author: user.userId});
            await comment.save();
            return res.status(201).json({comment});
        } catch (e) {
            error(e, res);
        }
    });

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
