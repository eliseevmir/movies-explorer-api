const allRouter = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movies');
const signRouter = require('./sign');
const auth = require('../middlewares/auth');

allRouter.use(signRouter);
allRouter.use(auth);
allRouter.use(routerUser);
allRouter.use(routerMovie);

module.exports = allRouter;
