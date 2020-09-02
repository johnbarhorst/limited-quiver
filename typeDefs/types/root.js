import { gql } from 'apollo-server-micro';

export const root = gql`
# Create holding values to extend on other files. Leaving these root types empty causes an error with Apollo
# (error subject to change in the future, this may become unecessary)
  type Query {
    root: String
    # gql test query:
    sayHello: String
  }

  type Mutation {
    root: String
  }

  # scalar declarations

  scalar Date
`;