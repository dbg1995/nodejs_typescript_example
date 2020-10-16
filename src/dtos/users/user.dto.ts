import { Expose, Exclude } from 'class-transformer';

import BaseDTO from '../concerns/base.dto';

@Exclude()
export default class UserDTO extends BaseDTO {
  @Expose()
  readonly username: string;
}
