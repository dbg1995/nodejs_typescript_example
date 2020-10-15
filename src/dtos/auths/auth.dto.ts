import { Expose, Exclude } from 'class-transformer';

@Exclude()
export default class AuthDTO {
  @Expose()
  readonly accessToken: string;
}
