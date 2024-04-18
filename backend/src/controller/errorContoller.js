import AppError from "../../utils/appError.js";

function sendErrorProd(error, res) {
  if (error?.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "something went very wrong!",
    });
  }
}

function handleCastErrorDB(err) {
  const message = `Invalid ${err.path} : ${err.value}`;

  return new AppError(message, 400);
}

function handleJWTToken() {
  return new AppError("Invalid token, Please login again", 401);
}

function validatorError(error) {
  const err = error.message.split(":");
  return new AppError(err[err.length - 1].trim(), 400);
}

export default function (error, _, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";

  if (process.env.NODE_ENV === "development") {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error,
      stack: error.stack,
    });
  } else {
    let prodError = error;

    if (error.name === "CastError") prodError = handleCastErrorDB(error);
    if (error.name === "JsonWebTokenError") prodError = handleJWTToken();
    if (error.name === "ValidationError") prodError = validatorError(error);

    sendErrorProd(prodError, res);
  }

  next();
}
