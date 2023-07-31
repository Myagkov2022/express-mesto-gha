const errorsHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).json({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
};

module.exports = errorsHandler;
