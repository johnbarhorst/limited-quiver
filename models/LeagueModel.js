import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  leaguename: {
    type: String,
    required: [true, "Every league needs a name!"],
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],

});

const League = mongoose.models.League || mongoose.model('League', LeagueSchema);

export default League;