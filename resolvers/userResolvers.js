import { ApolloError, AuthenticationError } from 'apollo-server-micro';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { setTokenCookie } from 'utils/cookie';
import User from 'models/UserModel';

const userResolvers = {
  Query: {
    async userByUsername(parent, { username }, context, info) {
      const regex = new RegExp(username, "i");
      const result = await User.findOne({ username: { $regex: regex } });
      return result
    },
    async allUsers(parent, args, context, info) {
      const users = await User.find();
      return users;
    }
  },
  Mutation: {
    async newUser(parent, args, context, info) {

      const data = args.user;
      // RegExp for insensitive case, and exact matching
      const regex = new RegExp(`^${data.username}$`, "i");
      const userExists = await User.exists({ username: { $regex: regex } });
      if (userExists) {
        return new ApolloError(
          `A user with username ${data.username} already exists.`
        )
      }
      try {
        // Hash out the password for safety.
        const password = await hash(data.password, 10);
        const newUser = await User.create({
          ...data,
          password,
        });
        await newUser.save((saveErr) => {
          if (saveErr) {
            return new ApolloError(saveErr, "New User Save Error");
          }
        })
        return newUser;
      } catch (err) {
        return new ApolloError(err, "catch caught error.")
      }
    },
    async loginUser(parents, { credentials }, context, info) {
      const regex = new RegExp(`^${credentials.email}$`, "i");
      const user = await User.findOne({ email: { $regex: regex } }).select("+password");
      const pwConfirm = await compare(credentials.password, user.password);
      if (pwConfirm) {

        const payload = {
          id: user.id,
          username: user.username
        }
        const jwt = sign(payload, process.env.GUID, { expiresIn: "8h" });
        setTokenCookie(context.res, jwt);
        return {
          token: jwt,
          id: user.id
        }
      } else {
        return new AuthenticationError("Failed to Authorize");
      }

    }
  },
  User: {
    name: (parent, args, context, info) => {
      // parent here is the User object.

      // In my mongo schema, first and last name are just nested in the name property.
      // MDB sends that along normally, but we have to manually assign it here since GQL doesn't nest.
      const { first, last } = parent.name || { first: null, last: null };

      return {
        first,
        last
      }
    },
  }
}

export default userResolvers;