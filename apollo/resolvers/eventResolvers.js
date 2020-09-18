import { ApolloError } from 'apollo-server-micro';
import logKeys from 'utils/logKeys';
import Event from 'models/EventModel';

const eventResolvers = {
  Query: {
    async findEvent(parent, { name }, context, info) {
      const regex = new RegExp(name, "i");
      const result = await Event.findOne({ username: { $regex: regex } });
      return result;
    },
    async allEvents(parent, args, context, info) {
      console.log(context);
      const results = await Event.find({});
      return results;
    }
  },
  Mutation: {
    async newEvent(parent, args, context, info) {
      logKeys(context);
      const data = args.event;
      const regex = new RegExp(`^${data.name}$`, "i");
      const eventExists = await Event.exists({ username: { $regex: regex } });
      if (eventExists) {
        return new ApolloError(
          `An event called ${data.name} already exists.`,
          "Code RED!",
        )
      }
      try {
        const newEvent = await Event.create({
          ...data
        });

        await newEvent.save(saveErr => {
          if (saveErr) {
            new ApolloError(saveErr, "Error saving new event")
          }
        });

        return newEvent;

      } catch (error) {
        return new ApolloError(error, "Caught err in event creation mutation")
      }
    }
  }
}

export default eventResolvers;