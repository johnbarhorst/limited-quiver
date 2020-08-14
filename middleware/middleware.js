import nextConnect from 'next-connect';
import dbConnect from 'utils/dbConnect';

const middleware = nextConnect();

middleware.use(dbConnect);

export default middleware;