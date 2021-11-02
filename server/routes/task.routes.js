const {Router} = require('express');
const error = require('./services/error');
const {check, validationResult} = require('express-validator');
const Task = require('../models/Task');
const History = require('../models/History');
const auth = require('../middleware/auth.middleware');
const abilities = require('../middleware/task.abilities');
const router = Router();

router.delete('/:id',
    auth,
    abilities,
    async (req, res) => {
        try {
            const taskId = req.params.id;
            const task = await Task.findOne({_id: taskId});
            if (!task) {
                return res.status(404).json('Not found');
            }

            if (!req.ability.can('delete', task)) {
                return res.status(403).json('Forbidden');
            }

            await Task.deleteOne({_id: taskId});
            return res.status(201).json({task});
        } catch (e) {
            error(e, res);
        }
    });

router.post('/:id',
    auth,
    abilities,
    [
        check('created', 'Error property "created"').not().exists(),
        check('updated', 'Error property "updated"').not().exists(),
        check('author', 'Error property "author"').not().exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.status(400).json({
                    errors: errors,
                    message: 'Incorrect request'
                })
            }

            const taskId = req.params.id;
            const task = await Task.findOne({_id: taskId});

            if (!task) {
                return res.status(404).json('Not found');
            }

            if (!req.ability.can('update', task)) {
                return res.status(403).json('Forbidden');
            }

            let changedSomething = false;
            const removed = [];
            const added = [];
            for (let key in req.body) {
                removed.push({category: key, value: task[key]});
                added.push({category: key, value: req.body[key]});
                task[key] = req.body[key];
                changedSomething = true;
            }

            if (changedSomething) {
                const timestamp = Date.now();
                task.updated = timestamp;
                task.updatedBy = {userId: req.user.userId, name: req.user.name};

                await task.save();

                const history = new History({taskId, author: req.user.name, timestamp, added, removed});
                await history.save();
            }

            return res.status(201).json({task});
        } catch (e) {
            error(e, res);
        }
    });

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
            const search = req.query.search;
            let tasks;
            if (search) {
                const regexp = new RegExp(search, 'i');
                tasks = await Task.find({
                    $or: [
                        {summary: regexp},
                        {description: regexp}
                    ]
                });
            } else {
                tasks = await Task.find();
            }
            const allowedTasks = tasks.filter(task => req.ability.can('read', task));
            return res.status(200).json({tasks: allowedTasks});
        } catch (e) {
            error(e, res);
        }
    });

module.exports = router;
