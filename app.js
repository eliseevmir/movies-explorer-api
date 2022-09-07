const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const auth = require('./src/middlewares/auth');
require('dotenv').config();

const routerUser = require('./src/routes/users');
const routerMovie = require('./src/routes/movies');
const { createUser, login } = require('./src/controllers/user');

const createUserSchemaValidation = require('./src/schemaValidator/createUserSchema');
const loginUserSchemaValidation = require('./src/schemaValidator/loginUserSchema');

const NotFoundError = require('./src/errors/NotFoundError');

const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(helmet());
app.use(limiter);
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/signup', createUserSchemaValidation, createUser);
app.use('/signin', loginUserSchemaValidation, login);
app.use(auth);
app.use('/', routerUser);
app.use('/', routerMovie);
app.use(() => {
  throw new NotFoundError('Роут не найден');
});

app.listen(PORT);
