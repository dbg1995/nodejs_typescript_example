import { BAD_REQUEST } from '../constants/http-code.constant';

export default class BadRequestException extends Error {
  public status = BAD_REQUEST;
  public message: string;

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}
