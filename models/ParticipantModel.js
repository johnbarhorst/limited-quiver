import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A user id was not provided to new Participant.user'],
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'An event id was not provided to new Participant.event'],
  },
  scores: [{
    type: Schema.Types.ObjectId,
    ref: 'Score'
  }],
  // TODO: Permissions and or roles
  // permissions: array of enum values? canEdit, canAddParticipant, etc?
});

const Participant = mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);
export default Participant;