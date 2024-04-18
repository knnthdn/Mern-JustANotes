import AppError from "../../utils/appError.js";

export default function (req, res, next) {
  next(new AppError(`Requested Url: ${req.originalUrl} , is not existed`));
}
