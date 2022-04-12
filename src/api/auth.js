// libs
import { Router } from 'express';
import bcrypt from 'bcrypt';

// modules
import UserModel from '../models/UserModel.js';
import { newToken } from '../utils/auth.js';

// router init
const router = Router();

// router
router.post('/login', async (req, res) => {
  // id & pw를 DB 에서 검증하여 같으면 진행, 다르면 에러 출력
  // 로그인 성공 시, 토큰을 server 로부터 받아 client 에 저장하기
  try {
    const { username, password } = req.body;
    // id check
    const user = await UserModel.findOne({ username: username });
    if (!user)
      res.status(401).send({ err: 'Authentication failed. User not found.' });
    // pw check
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      res.status(401).json('Authentication failed. Wrong password.');
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
      res.status(200).send(result);
    }
  } catch (err) {
    if (err) res.status(500).send('Internal Server Error');
    throw err;
  }
});

export default router;
