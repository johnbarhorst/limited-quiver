import { ApolloError } from 'apollo-server-micro';
import Event from 'models/EventModel';

export const eventQueries = {
  async findEvent(parent, { name }, context, info) {
    const regex = new RegExp(name, "i");
    const result = await Event.findOne({ username: { $regex: regex } });
    return result;
  },
  async allEvents(parent, args, context, info) {
    const results = await Event.find({});
    return results;
  }
}

export const eventMutations = {
  async newEvent(parent, args, context, info) {
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