import { ApolloError } from 'apollo-server-micro';
import User from 'models/UserModel';
import { hash } from 'bcrypt';

export const userResolvers = {
  Query: {
    async userByUsername(parent, { username }, context, info) {
      const regex = new RegExp(username, "i");
      const result = await User.findOne({ username: { $regex: regex } });
      return result
    },
  },
  Mutation: {
    async newUser(parent, args, context, info) {
      // Do JS/DB stuff inside here

      const data = args.user;
      const regex = new RegExp(`^${data.username}$`, "i");
      const userExists = await User.exists({ username: { $regex: regex } });
      if (userExists) {
        return new ApolloError(
          `A user with username ${data.username} already exists.`,
          "Code RED!",
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
  },
  User: {
    name: (parent, args, context, info) => {
      // parent here is the User object.
      // Do JS stuff to get what you want. In a DB, do DB things.

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


