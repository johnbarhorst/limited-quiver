import { gql } from 'apollo-server-micro';

export const userTypeDefs = gql`
  type User {
    id: ID
    username: String
    name: Name
    email: String
  }

  type Name {
    first: String
    last: String
  }

  # Use inputs to cleanly define args for mutations. Just remember it adds an object layer
  
  input UserInput {
    username: String
    email: String
    name: NameInput
    password: String
   }

  # If you have nested/custom fields in your type def, and you want to use inputs with your mutations
  # you need to have an input for the nested/custom field as well. Populate that data in the resolver

  input NameInput {
    first: String
    last: String
  }

  extend type Query {
    userByUsername(username: String!): User
  }

  extend type Mutation {
    newUser(user: UserInput): User
  }

`;