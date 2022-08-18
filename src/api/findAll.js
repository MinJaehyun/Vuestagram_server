import { Router } from 'express';
import PostModel from '../models/PostModel.js';

const router = Router();

// 비회원이 전체 노트를 볼 수 있는 api
router.get('/', async (req, res) => {
  try {
    const data = await PostModel.find({});
    console.log('data: ', data);
    res.status(200).json({ findAll: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'sth wrong', error });
  }
});

export default router;
