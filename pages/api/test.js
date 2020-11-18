import User from 'models/UserModel';
import dbConnect from 'lib';

const test = async (req, res) => {
  try {
    await dbConnect();
    const user = await User.findById("5f988cdb30a3097309ebdbd6");

    res.status(200).json(user);

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error!", error: e })
  }

}

export default test;