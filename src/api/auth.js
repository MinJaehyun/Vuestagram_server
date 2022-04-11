// libs
import { Router } from 'express';
import bcrypt from 'bcrypt';

// modules
import UserModel from '../models/UserModel.js';

// router init
const router = Router();

// router
router.post('/signup', (req, res) => {
  const { username, password, nickname } = req.body;
  bcrypt.hash(password, 10, (error, hashedPassword) => {
    try {
      const newUser = new UserModel({
        username,
        password: hashedPassword,
        nickname,
      });
      newUser.save((error, saved) => {
        if (error) {
          // 경우 1. res.status(409).send(); // status(409) 를 나타내므로 뒤에 send 를 출력하지 못한다.
          // 경우 2. res.send().status(409);
          /** FIXME: status(409) 설정 시,
           * server 값을 client 에서 잘 수신 했으므로 200 나타내며,
           * client 에서 server 로 요청 시, id 충돌로 409 나타내도록,
           * 로직 작성하였는 흐름이 맞는지? */
          console.log(error);
          res.send('존재하는 id 입니다').status(409);
        } else {
          console.log(saved);
          res.send(saved);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  });
});

export default router;
