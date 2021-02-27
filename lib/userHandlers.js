import { hash } from 'bcrypt';
import User from 'models/UserModel';

export const getUser = async (req, res) => {
  if (!req.user) {
    const error = new Error("Not authorized!");
    error.status = 403;
    throw error;
  }
  res.json(req.user)
};

export const createUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  // TODO: normalize email to avoid duplicates.

  // Hash Password
  const hashedPassword = await hash(password, 10);

  // Create New User
  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword
  });

  try {
    // Save new user to database
    await newUser.save();
  } catch(error) {
    console.log(error);
    res.status(400).json({ message: "Error saving new user", error });
  }
  
  try {
    // Auto log in with new credentials.
    req.login(newUser, error => {
      if(error) throw new Error(error);
      res.status(201).json({ success: true, newUser });
    });
  } catch(error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login Error", error });
  }
  res.status(500).json({success: false, message: "Uncaught Error at Create User", error});
}