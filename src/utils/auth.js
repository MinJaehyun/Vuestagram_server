// json related
import jwt from 'jsonwebtoken';
// import { SECRET_KEY, EXPIRATION_DATE } from '../config/index';

// jwt option
const SECRET_KEY = 'jh-secret-token';
const EXPIRATION_DATE = '150d';

// sign token
export const newToken = user => {
  const payload = {
    username: user.username,
    _id: user._id,
  };
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRATION_DATE,
  });
};

// verify token
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
