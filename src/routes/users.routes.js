const router = require('express').Router();
const usersController = require('../controllers/users.controller');

const prefix = 'users';

router.route(`/${prefix}`)
    .post(usersController.create);

module.exports = router;