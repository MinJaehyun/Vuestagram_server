// json related
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import { SECRET_KEY, EXPIRATION_DATE } from '../config/index.js';

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

// user 인증
export const authenticateUser = async (req, res, next) => {
  /**
   * 1. authorization 유무 검증
   * 2. token 검증
   * 3. user 는 token 을 받는데, 이 token._id 로  user 인증
   */
  // 1.
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'token must be included' });
  }
  // 2.
  let payload;
  // NOTE: swagger 기본 설정은 Bearer 없다.
  // const token = req.headers; // test1
  const token = req.headers.authorization; // test2
  // NOTE: postman 실행 위해 Bearer 필요? 아래는 Authorization Bearer token 값 지정한 경우에 따른 설정.
  // const token = req.headers.authorization.split(' ')[1]; // test3
  try {
    payload = await verifyToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'token is invalid' });
  }
  // 3.
  const user = await UserModel.findById(payload._id).select('-password');
  if (!user) {
    return res.status(401).json({ message: 'user is not found' });
  }
  req.user = user;
  // app.use('/posts', authenticateUser, posts)
  // authenticateUser 인증 처리 후 posts router 를 실행하기 위해 next() 설정
  next();
};
