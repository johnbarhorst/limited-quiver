import nextConnect from 'next-connect';
import { hash } from 'bcrypt';
import middleware from 'middleware/middleware';
import User from 'models/UserModel';
import { extractUser } from 'lib/api-helpers';
import logKeys from 'utils/logKeys';
import dbConnect from 'utils/dbConnect';


const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => res.json(extractUser(req)));
handler.post(async (req, res) => {
  console.log(req.body);
  logKeys(req);
  const { name, username, email, password } = req.body;
  // TODO: normalize email to avoid duplicates.
  try {
    const hashedPassword = await hash(password, 10);
    await dbConnect();
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword
    });
    await newUser.save(error => {
      console.log("New User Error", error);
      if (error) {
        return res.status(500).json({ message: "Error saving new user", error });
      }
    });
    req.logIn(newUser, (error => {
      if (error) throw error;
      res.status(201).json({ success: true, newUser });
    }))

  } catch (error) {
    console.log("Catch Error", error);
    return res.status(500).json({ message: "Catch Error at User Post Route", error })
  }
});

export default handler;