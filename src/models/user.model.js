const mongoose = require('mongoose');
const hashUtil = require('../utils/hash.util');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Nombre es requerido'] },
    lastName: { type: String, required: [true, 'Apellido es requerido'] },
    username: { type: String, required: [true, 'Username es requerido'], unique: true },
    password: { type: String, required: [true, 'Contraseña es requerida'] }
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hashUtil.generate(this.password);
    }
    next();
});

userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error(`Ya existe el nombre de usuario: ${doc.username}`));
    } else {
        next();
    }
});

module.exports = mongoose.model('User', userSchema, 'users');