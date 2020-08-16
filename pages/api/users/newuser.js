import nextConnect from 'next-connect';
const mongoose = require('mongoose');
import middleware from 'middleware/middleware';
import User from 'models/UserModel';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const data = JSON.parse(req.body);
  const newUser = await User.create(data);
  res.status(200).send(newUser);
})

export default handler;