const router = require('express').Router();
const usersRoutes = require('./users.routes');
const authRoutes = require('./auth.routes');
const conversationsRoutes = require('./conversations.routes');

const version = 'v1';
const prefix = `/api/${version}`;

router.use(prefix, usersRoutes);
router.use(prefix, authRoutes);
router.use(prefix, conversationsRoutes);

module.exports = router;