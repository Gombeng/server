import { responseHandler } from "../utils/responseHandler.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  responseHandler(
    res,
    statusCode,
    false,
    err.message || "Internal Server Error"
  );
};
