const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const jwtRequired = require('../middlewares/jwt-required.middleware');
const prefix = 'users';

router.route(`/${prefix}`)
    .get(jwtRequired, usersController.getAll)
    .post(usersController.create);

module.exports = router;