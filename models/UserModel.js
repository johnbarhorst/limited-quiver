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
  name: {
    first: String,
    last: String
  },
  email: {
    type: String,
    required: [true, "Email address must be provided"],
    select: false
  },
  password: {
    type: String,
    required: [true, "Don't leave the door unlocked."],
    select: false
  },
  leagues: [{ type: Schema.Types.ObjectId, ref: "League" }],
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],

}, { timestamps: { createdAt: 'created_at' } });

UserSchema.virtual('fullname').get(function () {
  return `${this.name.first || ''} ${this.name.last || ''}`;
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;