import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';
import User from 'models/UserModel';


// connect to middleware
const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const { username } = req.query;
  const regex = new RegExp(username, "i");
  const result = await User.findOne({ username: { $regex: regex } });
  if (!result) {
    return res.status(404).send({ success: false, message: `No ${username} found in database.` })
  }
  res.status(200).json({ success: true, data: result });
});

export default handler;