const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Enter password').exists(),
        check('password', 'Wrong password (8-50 characters').isLength({min: 8, max: 50}),
        check('name', 'Enter name').exists()
    ],
    async (req, res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                })
            }

            console.log(req.body);
            const {email, password, name} = req.body;

            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'User already exists'});
            }

            const hashedPass = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPass, name, regDate: Date.now()});

            await user.save();

            const token = jwt.sign(
                {userId: user._id},
                config.get('jwtSecret'),
                {expiresIn: '24h'}
            );

            res.status(201).json({accessToken: token, userId: user._id, name, role: user.role, message: 'Registered successful'});
        } catch (err) {
            res.status(500).json({
                message: 'Something went wrong...'
            });
        }
    });

router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect login or password'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: 'Incorrect login or password'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect login or password'});
            }

            const token = jwt.sign(
                {userId: user.id, role: user.role, balance: user.balance},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            );

            res.status(200).json({accessToken: token, userId: user.id, name: user.name, role: user.role});

        } catch (e) {
            res.status(500).json({
                message: 'Something went wrong...'
            });
        }

    });

module.exports = router;
