import jwt from 'jsonwebtoken';

import User from '../models/user';
import UnauthorizedException from '../exceptions/unauthorized.exception';
import { JWT_SECRET } from '../constants/app.constant';

const AuthMiddleware = (on: boolean) => {
  return async (req, res, next) => {
    try {
      if (!on) {
        return next();
      }

      const authorization = req.headers.authorization;
      if (!authorization) {
        return next(new UnauthorizedException());
      }

      const accessToken = authorization.split('Bearer ')[1];
      if (!accessToken) {
        return next(new UnauthorizedException());
      }

      const payload: any = jwt.verify(accessToken, JWT_SECRET);
      const user = await User.findOne({ _id: payload.id, deletedAt: null });

      if (!user) {
        return next(new UnauthorizedException());
      }

      req.user = user;
      return next();
    } catch (error) {
      return next(new UnauthorizedException());
    }
  };
};

export default AuthMiddleware;
