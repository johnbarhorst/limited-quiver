import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A user name is required'],
    unique: [true, `We're sorry, but that user name is taken`],
    minlength: [4, 'User name must be between 4 and 16 characters'],
    maxlength: [16, 'User name must be between 4 and 16 characters']
  },
  firstname: String,
  lastname: String,
  email: String,

}, { timestamps: { createdAt: 'created_at' } })

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;