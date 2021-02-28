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
  // Format data for consistency/search etc...
  const username = req.body.username.toLowerCase();
  const email = req.body.email.toLowerCase();

  // Check if username/email already registered. 
  // Mongoose will do this when we try to save, but this makes more uniform error handling for us.
  const alreadyExists = await User.find({$or: [{username}, {email}]});
  if(alreadyExists.length > 0) {
    return res.status(400).json({ success: false, message: "Username or email are already registered." });
  }

  // Hash Password
  const password = await hash(req.body.password, 10);

  // Create New User
  const newUser = new User({
    email,
    username,
    password
  });

  try {
    // Save new user to database
    await newUser.save();
  } catch(error) {
    console.log(error);
    return res.status(400).json({ message: "Error saving new user", error });
  }
  
  try {
    // Auto log in with new credentials.
    req.login(newUser, () => {
      return res.status(201).json({ success: true, newUser });
    });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Login Error", error });
  }
  // we shouldn't get here. But fall back for now. Not thrilled about this, but not sure it matters?
  res.status(500).json({success: false, message: "Uncaught Error at Create User", error});
}