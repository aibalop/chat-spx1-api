const usersService = require('../services/users.service');

exports.create = async (req, res) => {
    try {
        const newUser = await usersService.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};

exports.getAll = async (req, res) => {
    try {
        const query = req.query ?? {};
        query['ignoreId'] = req.payload?._id;
        const users = await usersService.getAll(query);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};