
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
}