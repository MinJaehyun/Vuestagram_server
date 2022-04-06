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
        nickname
      });
      newUser.save((error, saved) => {
        if(error) {
          res.status(409).send(error);
        } else {
          res.send(saved);
        }
      });
    } catch (error) {
      return res.status(500).json({error})
    }
  })
})

export default router;