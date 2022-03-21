const router = require('express').Router();
const usersRoutes = require('./users.routes');

const version = 'v1';
const prefix = `/api/${version}`;

router.use(prefix, usersRoutes);

module.exports = router;