import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User, { IUser } from '../models/user';
import BadRequestException from '../exceptions/bad-request.exception';
import LoginDTO from '../dtos/auths/login.dto';
import { JWT_SECRET, TOKEN_EXPIRES_IN } from '../constants/app.constant';
import { UNIQUE_ERROR, UNAUTHENTICATE } from '../constants/error.constant';

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

  public async authenticate(data: LoginDTO): Promise<IUser> {
    const { username, password } = data;
    const user = await User.findOne({ username, deletedAt: null });
    const isValidPassword = () => bcrypt.compare(password, user.password);

    if (user && (await isValidPassword())) {
      return user;
    }

    throw new BadRequestException(UNAUTHENTICATE);
  }
}
