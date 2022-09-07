const router = require('express').Router();

const { getUser, patchUser } = require('../controllers/user');
const patchUserSchemaValidation = require('../schemaValidator/patchUserSchema');

router.get('/users/me', getUser);
router.patch('/users/me', patchUserSchemaValidation, patchUser);

module.exports = router;
