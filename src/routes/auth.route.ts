import { Router } from 'express';
import {
  loginValidator,
  registerUserValidator,
} from '../validators/auth.validator';
import {
  getLoggedInUser,
  registerUser,
  signIn,
} from '../controllers/auth.controller';
import { protectRoute } from '../modules/auth.module';
import { inputValidationMiddleware } from '../middlewares';

const authRouter = Router();

authRouter.post('/login', loginValidator, inputValidationMiddleware, signIn);

authRouter.post(
  '/register',
  registerUserValidator,
  inputValidationMiddleware,
  registerUser
);

authRouter.get('/me', protectRoute, getLoggedInUser);

export default authRouter;
