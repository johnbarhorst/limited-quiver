import { gql } from 'apollo-server-micro';

export const eventTypeDefs = gql`
   type Event {
     id: String
     name: String
     admin: [User]
     participants: [User]
     active: Boolean
     private: Boolean
     rounds: Int
     shotsPer: Int
    #  TODO: Scores as int for now, will be a type in the future
     scores: Int
     participantCap: Int
     startDate: Date
     endDate: Date
   }

   input EventInput {
     name: String!
     admin: [UserInput]
     rounds: Int!
     shotsPer: Int!
     participantCap: Int!
     private: Boolean
     startDate: Date
     endDate: Date
   }

   extend type Query {
     findEvent(name: String!): [Event]
     allEvents: [Event]
   }

   extend type Mutation {
     newEvent(event: EventInput): Event
   }
`;