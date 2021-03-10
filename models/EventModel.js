import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    required: [true, 'One must name an event'],
    type: String,
    minlength: [3, 'Event name must be between 3 and 36 characters'],
    maxlength: [36, 'Event name must be between 3 and 36 characters'],
  },
  createdBy: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'createdBy needs a user id.'] },
  admin: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: Schema.Types.ObjectId, ref: 'Participant' }],
  active: Boolean,
  private: Boolean,
  rounds: {
    type: Number,
    required: [true, 'rounds field must have a number'],
  },
  shotsPerRound: {
    type: Number,
    required: [true, 'shotsPerRound field must have a number'],
  },
  participantCap: {
    type: Number,
    required: [true, 'participantCap field must have a number'],
  },
  scores: [{ type: Schema.Types.ObjectId, ref: 'Scores' }],
}, { timestamps: { createdAt: 'created_at' } });

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;