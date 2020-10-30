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
     scores: [Int]
     participantCap: Int
     startDate: Date
     endDate: Date
   }

   input EventInput {
     name: String
     createdBy: ID
     admin: [ID]
     rounds: Int!
     shotsPer: Int!
     participantCap: Int!
     private: Boolean
     startDate: Date
     endDate: Date
   }

   fragment FullEvent on Event {
    id
    name
    admin
    participants
    active
    private
    rounds
    shotsPer
    scores
    participantCap
    startDate
    endDate
   }

   extend type Query {
     findEvent(name: String!): [Event]
     allEvents: [Event]
     eventById(id: ID): Event
   }

   extend type Mutation {
     newEvent(event: EventInput): Event
   }
`;