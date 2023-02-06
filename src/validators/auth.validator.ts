import { body } from 'express-validator';

export const loginValidator = [
  body('email').isEmail().withMessage('email is required'),
  body('password').isString().withMessage('password is required'),
];

export const registerUserValidator = [
  body('firstName').isString().withMessage('firstName is required'),
  body('lastName').isString().withMessage('lastName is required'),
  body('email').isEmail().withMessage('email is required'),
  body('password').isString().withMessage('password is required'),
  body('image').optional().isString(),
  body('roles').optional().isIn(['CONSUMER', 'CREATOR']).isString(),
];

export const updateUserValidator = [
  body('firstName').optional().isString().withMessage('firstName is required'),
  body('lastName').optional().isString().withMessage('lastName is required'),
];
