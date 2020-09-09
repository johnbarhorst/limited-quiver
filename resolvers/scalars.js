import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const scalars = {
  //   # scalars are custom data types. Somehow GQL didn't think Date made the cut.
  //   # Declare scalars in the typeDefs, and create a resolver for it.
  // scalars
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date",
    parseValue(value) {
      // value from the client
      const newDate = new Date(value);
      return newDate;
    },
    serialize(value) {
      // value to be sent to client
      return new Date(value).getTime();
    },
    parseLiteral(ast) {
      // gets invoked to parse client input that was passed through the query.
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null
    }
  })
}

export default scalars;