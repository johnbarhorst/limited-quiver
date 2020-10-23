import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = {
  name: {
    required: [true, "One must name an event"],
    type: String,
    minlength: [4, "Event name must be between 4 and 36 characters"],
    maxlength: [36, "Event name must be between 4 and 36 characters"],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  admin: [{ type: Schema.Types.ObjectId, ref: "User" }],
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  active: Boolean,
  private: Boolean,
  rounds: Number,
  shotsPer: Number,
  participantCap: Number,
  scores: [{ type: Schema.Types.ObjectId, ref: "Scores" }],
  startDate: Number,
  endDate: Number
}

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default Event;