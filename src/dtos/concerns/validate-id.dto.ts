import { IsNotEmpty, IsMongoId } from 'class-validator';

export default class ValidateIdDTO {
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;
}
