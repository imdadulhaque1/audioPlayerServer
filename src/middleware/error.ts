import { ErrorRequestHandler } from "express";

export const errorhandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
  next();
};
