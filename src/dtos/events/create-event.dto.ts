import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsDateString,
  registerDecorator,
} from 'class-validator';

import IsFuture from '../../decorators/is-future.decorator';
import { SHORT_LENGTH, LONG_LENGTH } from '../../constants/validation.constant';
import { IS_GREATER_THEN_START_DATE_ERROR } from '../../constants/error.constant';

export default class CreateEventDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(LONG_LENGTH)
  readonly description: string;

  @IsNotEmpty()
  @IsDateString()
  @IsFuture('startDate')
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @IsGreaterThanDueDate()
  readonly dueDate: Date;
}

export function IsGreaterThanDueDate() {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: 'isGreaterThanDueDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { message: IS_GREATER_THEN_START_DATE_ERROR },
      validator: {
        validate(value: any, arg: any) {
          const startDate = new Date(arg.object.startDate).getTime();
          const dueDate = new Date(value).getTime();

          return !startDate || startDate < dueDate;
        },
      },
    });
  };
}
