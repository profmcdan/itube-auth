import { Router } from 'express';
import { protectRoute } from '../modules/auth.module';
import {
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller';
import { updateUserValidator } from '../validators/auth.validator';
import { inputValidationMiddleware } from '../middlewares';

const userRouter = Router();

userRouter.get('/', protectRoute, getUsers);

userRouter.get('/:id', protectRoute, getOneUser);

userRouter.put(
  '/:id',
  protectRoute,
  updateUserValidator,
  inputValidationMiddleware,
  updateUser
);

userRouter.delete('/:id', protectRoute, deleteUser);

export default userRouter;
