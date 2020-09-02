
import { root, userTypeDefs, eventTypeDefs } from './types';


const typeDefs = [root, userTypeDefs, eventTypeDefs];

export default typeDefs;

//   # type Example {
//   #   id: ID!                      Bang behind item makes it required.
//   #   reqArray: [SOMETYPE]!        Bang behind array means either [] or [...withData] may be requested.
//   #   reqArrWItems: [SOMETYPE!]!   Bang behind both means only [...withData] can be requested.
//   # }

//   # Note that required here means required to send with every query.
//   # I do not believe it is the same as required fields in the MDB schema/models
//   # So while every User we create may need a username at creation, we don't exactly
//   # have to send that along with every single data query. (but maybe we want to?)