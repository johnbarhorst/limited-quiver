import nextConnect from 'next-connect';
import { hash } from 'bcrypt';
import middleware from 'middleware/middleware';
import User from 'models/UserModel';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const { name, username, email, password } = req.body;
  // TODO: normalize email to avoid duplicates.
  const hashedPassword = await hash(password, 10);
  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword
  });
  await newUser.save(error => {
    if (error) {
      console.log("New User Error", error);
      res.status(500).json({ message: "Error saving new user", error });
      return;
    }
  });
  req.login(newUser, error => {
    if (error) {
      console.log("Login Error:", error);
      res.status(500).json({ success: false, message: "Login Error", error });
      return;
    }
    res.status(201).json({ success: true, newUser });
    return;
  });
});

export default handler;