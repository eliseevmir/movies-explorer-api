const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');

const routers = require('./src/routes/allRouters');

const { requestLogger, errorLogger } = require('./src/middlewares/logger');

const NotFoundError = require('./src/errors/NotFoundError');
const handlerError = require('./src/errors/HandlerError');

const { PORT = 3000, MONGODB, NODE_ENV } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routers);
app.use(() => {
  throw new NotFoundError('Роут не найден');
});

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

app.listen(PORT);
