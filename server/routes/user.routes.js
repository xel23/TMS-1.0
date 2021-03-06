const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const abilities = require('../middleware/user.abilities');
const error = require('./services/error');
const {User} = require('../models/User');
const {Role} = require('../models/Role');
const {check, validationResult} = require('express-validator');

router.post('/:id/grant-role',
    auth,
    abilities,
    [
        check('role', 'No role').exists().isString()
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

            const {role} = req.body;
            if (req.params.id) {
                const user = await User.findOne({_id: req.params.id});
                user.role = await Role.findOne({name: role});

                if (req.ability.can('update', user)) {
                    await user.save();
                    return res.status(201).json({message: 'User updated successfully'});
                }
                return res.status(403).json('Forbidden');
            } else {
                res.status(500).json({
                    message: 'No user id'
                });
            }
        } catch (e) {
            error(e, res);
        }
    });

router.post('/:id',
    auth,
    abilities,
    [
        check('name', 'Name error').isString().optional({ nullable: true }),
        check('email', 'Email error').isEmail().optional({ nullable: true }),
        check('role', 'Role error').custom(value => {
            for (let key in value) {
                if (!Role.schema.paths.hasOwnProperty(key)) {
                    throw new Error('Incorrect permission schema');
                }
            }
            return true;
        }).optional({nullable: true})
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

            const user = await User.findOne({_id: req.params.id}).select({password: 0});

            if (req.ability.can('update', user)) {
                let changedSomething = false;
                for (let key in req.body) {
                    changedSomething = true;
                    if (key === 'role') {
                        user[key] = Object.assign(user[key], req.body[key]);
                        continue;
                    }
                    user[key] = req.body[key];
                }
                changedSomething && await user.save();
                return res.status(201).json({user});
            }
            return res.status(403).json('Forbidden');
        } catch (e) {
            error(e, res);
        }
    });

router.get('/:id',
    auth,
    abilities,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id}).select({password: 0});
            if (req.ability.can('read', user)) {
                return res.status(200).json({user});
            }
            return res.status(403).json('Forbidden');
        } catch (e) {
            error(e, res);
        }
    });

router.get('/',
    auth,
    abilities,
    async (req, res) => {
        try {
            if (req.ability.can('read', 'User')) {
                const users = await User.find().select({email: 1, name: 1, regDate: 1, role: 1});
                return res.status(200).json({users});
            }
            return res.status(403).json('Forbidden');
        } catch (e) {
            error(e, res);
        }
    });

module.exports = router;
