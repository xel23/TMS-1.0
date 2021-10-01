const {Router} = require('express');
const error = require('./services/error');
const {check, validationResult} = require('express-validator');
const Task = require('../models/Task');
const auth = require('../middleware/auth.middleware');
const abilities = require('../middleware/task.abilities');
const router = Router();

router.get('/:id',
    auth,
    abilities,
    async (req, res) => {
        try {
            if (req.params.id) {
                const task = await Task.findOne({_id: req.params.id});
                if (req.ability.can('read', task)) {
                    return res.status(200).json({task});
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
);

router.post('/',
    auth,
    abilities,
    [
        check('summary', 'Summary error').exists().isString(),
        check('type', 'Task type error').exists().isString(),
        check('priority', 'Priority error').exists().isString(),
        check('status', 'Task status error').exists().isString()
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

            if (!req.ability.can('create', 'Task')) {
                return res.status(403).json('Forbidden');
            }
            const {summary, description, assignee, type, priority, subsystem, status} = req.body;
            const user = req.user;
            const task = new Task({summary, description, assignee, type, priority, subsystem, status,
                author: {name: user.name, userId: user.userId}});
            await task.save();
            return res.status(201).json({task});
        } catch (e) {
            error(e, res);
        }
    });

router.get('/',
    auth,
    abilities,
    async (req, res) => {
        try {
            const tasks = await Task.find();
            const allowedTasks = tasks.filter(task => req.ability.can('read', task));
            return res.status(200).json({tasks: allowedTasks});
        } catch (e) {
            error(e, res);
        }
    });

module.exports = router;
