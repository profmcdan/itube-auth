import prisma from '../config/database';
import {
  comparePassword,
  createJwt,
  generateRandomString,
  hashPassword,
} from '../modules/auth.module';

export const createUser = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      email: req.body.email.toLowerCase().trim(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    },
  });
  const today = new Date();

  const token = await prisma.token.create({
    data: {
      userId: user.id,
      value: generateRandomString(128),
      expiry: new Date(today.setDate(new Date().getDate() + 7)),
      category: 'SIGNUP',
    },
  });

  // TODO: Send email to set password.

  res.status(201).json({ success: true, data: { user, token: token.value } });
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
