import { UNAUTHORIZED } from '../constants/error.constant';
import { UNAUTHORIZED_CODE } from '../constants/http-code.constant';

export default class UnauthorizedException extends Error {
  public status = UNAUTHORIZED_CODE;
  public message = UNAUTHORIZED;

  constructor() {
    super(UNAUTHORIZED);
  }
}
