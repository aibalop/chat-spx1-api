const User = require('../models/user.model');

exports.create = (user) => {
    const newUser = new User(user);
    return newUser.save();
};

exports.getByUsername = (username) => {
    return User.findOne({ username });
};