const router = require('express').Router();
const authController = require('../controllers/auth.controller');

const prefix = 'auth';

router.route(`/${prefix}`)
    .post(authController.signIn);

module.exports = router;