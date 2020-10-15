import { UNAUTHORIZED } from '../constants/error.constant';

export default class UnauthorizedException extends Error {
  public status = 401;
  public message = UNAUTHORIZED;

  constructor() {
    super(UNAUTHORIZED);
  }
}
