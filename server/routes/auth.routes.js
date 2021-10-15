const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret, GOOGLE_CLIENT_ID} = require('../config')
const {check, validationResult} = require('express-validator');
const {User} = require('../models/User');
const {Role} = require('../models/Role');
const error = require("./services/error");
const router = Router();
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(GOOGLE_CLIENT_ID)

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
            const {email, password, name} = req.body;

            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'User already exists'});
            }

            const hashedPass = await bcrypt.hash(password, 12);
            const role = await Role.findOne({name: 'registered'});
            const user = new User({email, password: hashedPass, name, role, regDate: Date.now()});

            await user.save();

            const token = jwt.sign(
                {userId: user.id, role: user.role, name: user.name},
                jwtSecret,
                {expiresIn: '24h'}
            );

            res.status(201).json({accessToken: token, userId: user._id, name, role: user.role, message: 'Registered successful'});
        } catch (e) {
            error(e, res);
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
                {userId: user.id, role: user.role, name: user.name},
                jwtSecret,
                {expiresIn: '24h'}
            );

            res.status(200).json({accessToken: token, userId: user.id, name: user.name, role: user.role});

        } catch (e) {
            error(e, res);
        }

    });


router.post(
    '/loginGoogle',
    [
        check('token', 'Incorrect email').exists().isString(),
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

            const {token} = req.body;

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: GOOGLE_CLIENT_ID
            });
            const {email} = ticket.getPayload();
            console.log(email);
            let user = await User.findOne({email});
            if (!user) {
                user = new User({email, password: token, name: email, regDate: Date.now(), role: {
                        name: 'registered',
                        readTask: true,
                        updateTask: true,
                        createTask: true,
                        deleteTask: false,
                        readUser: true,
                        updateUser: false,
                        createUser: false,
                        deleteUser: false
                    }});

                await user.save();

                const accessToken = jwt.sign(
                    {userId: user._id},
                    jwtSecret,
                    {expiresIn: '24h'}
                );

                res.status(201).json({accessToken, userId: user._id, name: user.name, role: user.role, message: 'Registered successful'});
            }

            const accessToken = jwt.sign(
                {userId: user.id, role: user.role, name: user.name},
                jwtSecret,
                {expiresIn: '24h'}
            );

            res.status(200).json({accessToken, userId: user.id, name: user.name, role: user.role});

        } catch (e) {
            error(e, res);
        }

    });

module.exports = router;
