import nextConnect from 'next-connect';
import { hash } from 'bcrypt';
import middleware from 'middleware/middleware';
import User from 'models/UserModel';

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);
  const userExists = await User.findOne({ username: data.username });
  if (userExists) {
    return res.status(409).send({ success: false, message: `${data.username} already exists.` });
  }

  try {
    hash(data.password, 10, function (err, hash) {
      if (err) return res.status(500).send({ success: false, message: err });
      const newUser = new User({
        ...data,
        password: hash
      });

      newUser.save((saveErr, savedUser) => {
        // Don't wanna send along the hashed password
        const { password, ...userData } = savedUser._doc;
        // TODO: Save errors aren't really handled by this. Preventing submission on front end for now.
        if (saveErr) {
          console.log('Save error: ', saveErr);
          return res.status(409).send({ success: false, message: saveErr });
        }
        res.status(201).send({ success: true, data: userData });
      })
    });
  } catch (e) {
    console.log('Catch caught ERROR: ', e);
    res.status(404).send({ success: false, message: e });
  }

})

export default handler;