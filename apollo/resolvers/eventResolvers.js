import { ApolloError } from 'apollo-server-micro';
import Event from 'models/EventModel';
import User from 'models/UserModel';
import { createRef } from 'react';

const eventResolvers = {
  Query: {
    // TODO: Event by name might go away. At very least need 
    async findEvent(parent, { name }, context, info) {
      const regex = new RegExp(name, "i");
      const result = await Event.find({ name: { $regex: regex } });
      return result;
    },
    async allEvents(parent, args, context, info) {
      return await Event.find().populate('admin');
    },
    async eventById(parent, args, context, info) {
      const results = await Event.findById(args.id).populate('admin');
      return results ? results : new ApolloError("No results on file for that event.");

    }
  },
  Mutation: {
    async newEvent(parent, args, context, info) {
      const data = args.event;
      try {
        const newEvent = new Event({
          ...data
        });

        await newEvent.save(saveErr => {
          if (saveErr) {
            new ApolloError(saveErr, "Error saving new event")
          }
        });

        const creator = await User.findById(data.createdBy);
        console.log(creator.events);
        creator.events.push(newEvent.id);
        await creator.save((err, creator) => {
          if (err) {
            new ApolloError(err, "Error saving event to user");
          }
        })
        return newEvent;

      } catch (error) {
        return new ApolloError(error, "Caught err in event creation mutation")
      }
    }
  }
}

export default eventResolvers;