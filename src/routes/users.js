const router = require('express').Router();

const { getUser, patchUser } = require('../controllers/user');

router.get('/users/me', getUser);
router.patch('/users/me', patchUser);

module.exports = router;
