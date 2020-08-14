import dbConnect from '../../middleware/database';

dbConnect();

export default async (req, res) => {
  res.json({ test: 'test' })
}