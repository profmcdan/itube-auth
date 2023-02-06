import { validationResult } from 'express-validator';

export const customMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

export const inputValidationMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400);
    res.send({ success: false, errors: errors.array() });
  } else {
    next();
  }
};
