const jwtUtil = require('../utils/jwt.util');

function jwtRequired(req, res, next) {
    try {

        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || authorizationHeader.split(' ')[0] !== 'Bearer') {
            throw new Error('Authorización por Bearer token no valida o ausente');
        }

        const token = authorizationHeader.substring('Bearer '.length, authorizationHeader.length)

        const decode = jwtUtil.verify(token);

        req.payload = decode;

        next();

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = jwtRequired;