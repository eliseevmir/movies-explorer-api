module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.status === 500 ? 'Ошибка по умолчанию' : err.message;
  res.status(statusCode).send({ message });
  next();
};
