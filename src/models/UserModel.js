import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    insertedData: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: 'created_at' } },
);

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
