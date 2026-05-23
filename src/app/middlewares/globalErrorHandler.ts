import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;

  let message = "Something went wrong!";

  if (error?.statusCode) {
    statusCode = error.statusCode;
  }

  if (error?.message) {
    message = error.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: {
      message: error?.message || "Something went wrong",
    },
    stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
