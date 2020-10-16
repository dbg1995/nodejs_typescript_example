import mongoose from 'mongoose';

import { MONGOOSE_OPTIONS, MONGOOSE_URI } from './constants/databse.constant';

export default class Database {
  public static init() {
    mongoose.Promise = global.Promise;

    return mongoose.connect(MONGOOSE_URI, MONGOOSE_OPTIONS);
  }
}
