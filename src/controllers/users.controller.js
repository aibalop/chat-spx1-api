const usersService = require('../services/users.service');

exports.create = async (req, res) => {
    try {
        const newUser = await usersService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};