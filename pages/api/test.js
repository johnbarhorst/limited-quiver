import nextConnect from 'next-connect';
import middleware from 'middleware/middleware';


const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  res.json({ test: 'test' })
})

export default handler;