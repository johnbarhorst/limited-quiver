import { hash, compare } from 'bcrypt';
import User from 'models/UserModel';

export const extractUser = req => {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const {
    name, email,
  } = req.user;
  return {
    name, email
  };
}

// export const createUser = async req => {
//   const {name, email, password} = req.body;
//   const hashedPassword = await hash(password, 10);

// }