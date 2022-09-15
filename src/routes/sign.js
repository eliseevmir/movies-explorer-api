const signRouter = require('express').Router();
const createUserSchemaValidation = require('../schemaValidator/createUserSchema');
const loginUserSchemaValidation = require('../schemaValidator/loginUserSchema');

const { createUser, login } = require('../controllers/user');

signRouter.post('/signup', createUserSchemaValidation, createUser);
signRouter.post('/signin', loginUserSchemaValidation, login);

module.exports = signRouter;
