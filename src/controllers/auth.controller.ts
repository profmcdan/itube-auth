import prisma from '../config/database';
import {
  comparePassword,
  createJwt,
  hashPassword,
} from '../modules/auth.module';

export const createUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      email: req.body.email.toLowerCase().trim(),
      name: req.body.name,
      password: hashedPassword,
    },
  });
  res.status(201).json({ success: true, data: user });
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email.toLowerCase().trim(),
    },
  });

  if (user !== null) {
    const isValid = await comparePassword(req.body.password, user.password);
    if (isValid) {
      res.send({ success: true, data: { accessToken: createJwt(user) } });
      return;
    }
  }
  res
    .status(401)
    .send({ success: true, detail: 'Invalid username or password' });
};

export const getLoggedInUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  delete user.password;
  res.send({ success: true, data: { user } });
};
