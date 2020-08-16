import nextConnect from 'next-connect';
const mongoose = require('mongoose');
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

  const newUser = new User(data);
  newUser.save((saveErr, savedUser) => {
    if (saveErr) {
      res.status()
    }
    res.status(201).send({ success: true, data: savedUser });
  })
})

export default handler;