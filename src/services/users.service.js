const User = require('../models/user.model');

exports.create = (user) => {
    const newUser = new User(user);
    return newUser.save();
};

exports.getByUsername = (username) => {
    return User.findOne({ username });
};

exports.getAll = (query) => {
    const filters = {};

    if (query?.ignoreId) {
        filters['_id'] = { $ne: query.ignoreId };
    }

    return User.find(filters);
};