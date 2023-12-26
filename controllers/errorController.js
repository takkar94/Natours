/* eslint-disable prettier/prettier */
const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};


const handleDuplicateFieldsDb = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
  const message = `Duplicate filed value: ${value} so please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = err => {
  //const
  const errors = Object.values(err.error).map(el => el.message);
  const message = `Invalid Input Data ${errors.join('. ')}`;
  return new AppError(message, 400);
};



const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);


const handleTokenExpired = () => new AppError('Your token has expired. Please log in again!', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  //known error sending message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    //program error not sent to clients
  } else {
    //logging the error
    console.error('error', err);

    res.status(500).json({
      status: 'error',
      message: 'something went very wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.assign(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDb(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDb(error);
    if(error.name === 'JsonWebTokenError') error = handleJWTError();
    if(error.name === 'TokenExpiredError') error = handleTokenExpired();
    sendErrorProd(error, res);
  }
};
