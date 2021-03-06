const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'No auth'});
        }

        req.user = jwt.verify(token, jwtSecret);
        next();
    } catch (e) {
        console.error(e);

        return res.status(401).json({message: 'No auth'});
    }
};
