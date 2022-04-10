import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
		required: true,
		unique: true,
		trim: true,
		maxlength: 50,
	},
	insertedData: {
		type: Date,
		default: Date.now,
	},
});

const UserModel = mongoose.model('Users', userSchema);

export default UserModel;
