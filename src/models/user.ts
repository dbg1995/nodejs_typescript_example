import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { SHORT_LENGTH, LONG_LENGTH } from '../constants/validation.constant';
import { SALT_LENGTH } from '../constants/app.constant';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      maxlength: SHORT_LENGTH,
    },
    password: {
      type: String,
      required: true,
      default: LONG_LENGTH,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function(_next) {
  if (!this.isModified('password')) {
    return _next();
  }

  this.password = await bcrypt.hash(this.password, SALT_LENGTH);
  return _next();
});

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  deletedAt: Date;
}
const User = mongoose.model<IUser>('User', userSchema);

export default User;
