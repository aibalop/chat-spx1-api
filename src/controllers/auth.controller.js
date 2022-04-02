const usersService = require('../services/users.service');
const jwtUtil = require('../utils/jwt.util');
const hashUtil = require('../utils/hash.util');

exports.signIn = async (req, res) => {
    try {

        const { username, password } = req.body;

        const user = await usersService.getByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'No se encontro el usuario: ' + username });
        }

        if (!hashUtil.compare(password, user.password)) {
            return res.status(401).json({ message: 'Contraseña equivocada' });
        }

        const userPayload = user.toObject();

        delete userPayload['password'];

        const token = jwtUtil.sign(userPayload);

        res.status(200).json({
            message: 'Acceso autorizado',
            token,
            user: userPayload
        });

    } catch (error) {
        res.status(400).json({ message: error.toString() });
    }
};