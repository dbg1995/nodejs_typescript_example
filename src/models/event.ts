import mongoose from 'mongoose';

import { SHORT_LENGTH, LONG_LENGTH } from '../constants/validation.constant';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      maxlength: SHORT_LENGTH,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      require: false,
      maxlength: LONG_LENGTH,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export interface IEvent extends mongoose.Document {
  name: string;
  startDate: Date;
  dueDate: Date;
  description: string;
  deletedAt: Date;
}

const Event = mongoose.model<IEvent>('Event', eventSchema);

export default Event;
