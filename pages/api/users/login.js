import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import User from 'models/UserModel';

const handler = nextConnect();
const failureMessage = {
  success: false,
  message: "Unable to verify user and/or password"
}

const checkValidity = (bool) => {
  if (!bool) {
    return res.status(401).json(failureMessage);
  }
}

handler.use(middleware);
handler.post(async (req, res) => {
  const { username, textPassword } = req.body;
  const currentUser = await User.findOne({ username_lower: username.toLowerCase() });
  checkValidity(currentUser);
  const match = await compare(textPassword, currentUser.password);
  checkValidity(match);


}); 
