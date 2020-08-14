const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A user name is required'],
    unique: [true, `We're sorry, but that user name is taken`],
    minlength: [true, 'User name must be between 4 and 16 characters'],
    maxlength: [true, 'User name must be between 4 and 16 characters']
  },
  firstname: String,
  lastname: String,
  email: String,

})



const User = mongoose.model('user', userSchema);

module.exports = User;