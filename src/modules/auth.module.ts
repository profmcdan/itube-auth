import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { appEnv } from '../config';

export const createJwt = user => {
  return jwt.sign({ id: user.id, email: user.email }, appEnv.jwtSecret);
};

export const hashPassword = async password => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const protectRoute = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).send({ success: false, detail: 'Not Authorized' });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401).send({ success: false, detail: 'Not Authorized' });
    return;
  }

  try {
    req.user = jwt.verify(token, appEnv.jwtSecret);
    next();
  } catch (err) {
    res
      .status(401)
      .send({ success: false, detail: 'Not Authorized', message: err.message });
    return;
  }
};
