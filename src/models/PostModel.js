import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contents: String,
  createdBy: {
    required: true,
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Users',
  },
});

// NOTE:
postSchema.index({ Users: 1, title: 1 }, { unique: true });
const PostModel = mongoose.model('Posts', postSchema);

export default PostModel;
