import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import User from 'models/UserModel';
import { hash } from 'bcrypt';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);

  // Check DB for existing user before we try to save.
  // TODO: Is it ok to just let error handling catch this one during the save op?
  const regex = new RegExp(data.username, "i");
  const userExists = await User.exists({ username: { $regex: regex } });
  if (userExists) {
    return res.status(409).json({ success: false, message: `${data.username} already exists.` });
  }

  try {
    // Hash out the password for safety.
    hash(data.password, 10, function (err, hash) {
      if (err) return res.status(500).send({ success: false, message: err });
      const newUser = new User({
        ...data,
        password: hash
      });

      // Barring incident, save the user.
      newUser.save((saveErr) => {
        if (saveErr) {
          console.log('Save error: ', saveErr);
          return res.status(409).json({ success: false, message: saveErr });
        }
        res.status(201).json({ success: true, message: "User Created" });
      })
    });
  } catch (e) {
    console.log('Catch caught ERROR: ', e);
    return res.status(404).json({ success: false, message: e });
  }

})

export default handler;