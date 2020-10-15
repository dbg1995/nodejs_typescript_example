import { Expose, Exclude } from 'class-transformer';

import BaseDTO from '../concerns/base.dto';

@Exclude()
export default class EventDTO extends BaseDTO {
  @Expose()
  readonly name: string;

  @Expose()
  readonly description: string;

  @Expose()
  readonly startDate: Date;

  @Expose()
  readonly dueDate: Date;
}
