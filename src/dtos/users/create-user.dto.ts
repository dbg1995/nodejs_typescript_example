import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

import { SHORT_LENGTH } from '../../constants/validation.constant';

export default class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly password: string;
}
