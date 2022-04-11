// libs
import { Router } from 'express';
import bcrypt from 'bcrypt';

// modules
import UserModel from '../models/UserModel.js';

// router init
const router = Router();

// router
router.post('/signup', async (req, res) => {
  const { username, password, nickname } = req.body;
  try {
    let user = await UserModel.findOne({ username });
    if (user) {
      return res.status(409).send('이미 존재하는 id 입니다.');
    }
    const newUser = new UserModel({
      username,
      password,
      nickname,
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;
