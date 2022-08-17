// libs
import { Router } from 'express';
import bcrypt from 'bcrypt';

// modules
import UserModel from '../models/UserModel.js';
import { newToken } from '../utils/auth.js';

// router init
const router = Router();

// Login Router
router.post('/login', async (req, res) => {
  // id & pw를 DB 에서 검증하여 같으면 진행, 다르면 에러 출력
  // 로그인 성공 시, 토큰을 server 로부터 받아 client 에 저장하기
  const { username, password } = req.body;
  try {
    // id check
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return (
        res
          .status(401)
          // Authentication failed. User not found.
          .send({ err: '잘못된 이메일을 입력하셨습니다.' })
      );
    }
    // pw check
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return (
        res
          .status(401)
          // Authentication failed. Wrong password.
          .json({ err: '잘못된 패스워드를 입력하셨습니다.' })
      );
    } else {
      const token = newToken(user);
      const loggedUser = {
        username: user.username,
        nickname: user.nickname,
      };
      res.status(200).json({
        success: true,
        user: loggedUser,
        message: 'Login Success',
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).send('Internal Server Error');
  }
});

// Signup Router
router.post('/signup', async (req, res) => {
  const { username, password, nickname } = req.body;
  if (!username || !password)
    return res.status(400).send({ err: 'Require nickname and password' });
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(409).send({ err: '이미 존재하는 id 입니다.' });
    }
    const newUser = new UserModel({ username, password, nickname });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    return res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err: err.message });
  }
});

export default router;
