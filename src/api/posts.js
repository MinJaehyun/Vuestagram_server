// libs
import { Router } from 'express';

// modules
import PostModel from '../models/PostModel.js';

// router init
const router = Router();

router.post('/', async (req, res) => {
  try {
    // NOTE: PostModel 가져오기 위해 model 미리 설정하기
    const doc = await PostModel.create({
      ...req.body,
      // NOTE: req.user 가져오기 위해 authenticate 미리 설정하기
      createdBy: req.user._id,
    });
    res.status(201).json({ data: doc });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({ message: 'Duplicated Data', error });
    }
    res.status(400).send({ message: 'something wrong', error });
  }
});

export default router;
