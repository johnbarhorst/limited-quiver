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
  const {username, email} = req.body;
  // Check if username/email already registered. 
  // Mongoose will do this when we try to save, but this makes more uniform error handling for us.
  // Collation for case insensitive searching.
  // TODO: I think this is suboptimal if the app gets used a lot. For our size, no big deal. But may need to adjust for a lowercase index?
  // Regexp version of case insensitve search in passportConfig. Don't know mongo well enough yet to know which is better.
  const alreadyExists = await User.find({$or: [{username}, {email}]}).collation({locale: 'en_US', strength: 1});
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