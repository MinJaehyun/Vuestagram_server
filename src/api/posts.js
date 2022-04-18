// libs
import { Router } from 'express';

// modules
import PostModel from '../models/PostModel.js';

// router init
const router = Router();

// 인증된 user 의 post 생성
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
      // Duplicated Data
      return res.status(400).send({
        message: '동일한 게시글이 존재합니다. 제목을 바꿔주세요.',
        error,
      });
    }
    res.status(400).send({ message: 'something wrong', error });
  }
});

// 인증된 특정 user 의 post 를 전체 조회
router.get('/', async (req, res) => {
  try {
    // NOTE: 인증된 모든 user 의 post 전체 조회
    // const doc = await PostModel.find({});
    // NOTE: 인증된 특정 user 의 post 전체 조회
    const doc = await PostModel.find({ createdBy: req.user._id });
    res.status(200).json({ post: doc });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'sth wrong', error });
  }
});

// 본인만의 post 를 삭제
router.delete('/:id', async (req, res) => {
  try {
    // findOneAndDelete, findOneAndRemove
    const removed = await PostModel.findOneAndDelete({
      /** NOTE: 아래 없으면 다른 사람의 작성글을 지울 수 있지만, 전체 조회에서 createdBy 걸어서 다른 사람의 id를 알 수는 없는 상태이다 */
      createdBy: req.user._id,
      _id: req.params.id,
    });
    if (!removed) {
      return res.status(400).json({ message: 'cannot remove the data' });
    }
    // NOTE: (removed), ({removed}), ({...removed})
    return res.status(200).json(removed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'sth wrong', error });
  }
});

export default router;
