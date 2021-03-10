import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A user name is required'],
    unique: [true, 'That user name is already in use.'],
    minlength: [3, 'User name must be between 3 and 16 characters'],
    maxlength: [16, 'User name must be between 3 and 16 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address must be provided.'],
    unique: [true, 'That email address has already been registered.']
  },
  password: {
    type: String,
    required: [true, 'No password supplied to password field of new User.'],
    select: false
  },
  participatingEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  createdEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],

}, { timestamps: { createdAt: 'created_at' } });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;