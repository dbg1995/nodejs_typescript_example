import { IsNotEmpty } from 'class-validator';

export default class LoginDTO {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
