import { gql } from 'apollo-server-micro';

export const userTypeDefs = gql`
  type User {
    id: ID
    username: String
    name: Name
    email: String
    events: [Event]
    friends: [User]
    # leagues: [League]
  }

  type Name {
    first: String
    last: String
  }

  # Use inputs to cleanly define args for mutations. Just remember it adds an object layer
  
  input NewUserInput {
    username: String
    email: String!
    name: NameInput
    password: String!
   }

  # If you have nested/custom fields in your type def, and you want to use inputs with your mutations
  # you need to have an input for the nested/custom field as well. Populate that data in the resolver

  input NameInput {
    first: String
    last: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  extend type Query {
    userByUsername(username: String!): User
    allUsers: [User]
    userById(id: ID): User!
  }

  extend type Mutation {
    newUser(user: NewUserInput): User
    loginUser(credentials: CredentialsInput): User!
    logoutUser: Boolean!
    validateUser: Boolean
  }

`;