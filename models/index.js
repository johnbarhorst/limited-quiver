// Models Index

import User from './UserModel';
import Event from './EventModel';
import League from './LeagueModel';


// Apollo recommends using models and data sources within context for fetching data and
// DB stuff instead of within resolvers. Then your resolver can just access context/datasource
// for the methods you want to accomplish. At this stage I feel like that is just one more level of 
// abstraction, but here is a note for future me if I want to revisit this way of life.

const models = {
  User,
  Event,
  League
}

export default models;