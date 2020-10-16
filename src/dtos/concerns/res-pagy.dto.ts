import { Expose, Exclude } from 'class-transformer';

@Exclude()
export default class ResPagyDTO {
  @Expose()
  readonly count: number;

  @Expose()
  readonly total: number;

  @Expose()
  readonly page: number;

  @Expose()
  readonly pageCount: number;
}
