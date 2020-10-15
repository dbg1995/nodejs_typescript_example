import { Expose, Exclude } from 'class-transformer';

@Exclude()
export default class BaseDTO {
  @Expose()
  readonly id: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
