import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/user';
import BadRequestException from '../exceptions/bad-request.exception';
import { JWT_SECRET, TOKEN_EXPIRES_IN } from '../constants/app.constant';
import { UNIQUE_ERROR } from '../constants/error.constant';

export default class UsersService {
  public async create(data: any): Promise<IUser> {
    const isUniqUserName = await User.count({ username: data.username });
    if (isUniqUserName) {
      throw new BadRequestException(UNIQUE_ERROR('username'));
    }
    const user = new User({ ...data });

    return user.save();
  }

  generateToken(id: string, username: string): string {
    return jwt.sign({ id, username }, JWT_SECRET, {
      expiresIn: TOKEN_EXPIRES_IN,
    });
  }
}
