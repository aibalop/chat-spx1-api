const usersService = require('../services/users.service');
const jwt = require('../utils/jwt.util');

exports.signIn = async (req, res) => {
    try {
        const token = jwt.sign({ hello: 'world' });
        const decode = jwt.verify(token);
        res.status(201).json({
            token,
            decode
        });
    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};