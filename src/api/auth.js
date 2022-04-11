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
  if (!username || !password)
    return res.status(400).send({ err: 'Require nickname and password' });

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(409).send('이미 존재하는 id 입니다.');
    }
    const newUser = new UserModel({ username, password, nickname });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    return res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
});

export default router;
