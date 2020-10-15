import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsDateString,
} from 'class-validator';

import { IsGreaterThanDueDate } from './create-event.dto';
import ValidateIdDTO from '../concerns/validate-id.dto';
import SkipUndefined from '../../decorators/skip-undefined.decorator';
import { SHORT_LENGTH, LONG_LENGTH } from '../../constants/validation.constant';
import IsFuture from '../../decorators/is-future.decorator';

export default class UpdateEventDTO extends ValidateIdDTO {
  @SkipUndefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly name: string;

  @SkipUndefined()
  @IsOptional()
  @IsString()
  @MaxLength(LONG_LENGTH)
  readonly description: string;

  @SkipUndefined()
  @IsNotEmpty()
  @IsDateString()
  @IsFuture('startDate')
  readonly startDate: string;

  @SkipUndefined()
  @IsNotEmpty()
  @IsDateString()
  @IsGreaterThanDueDate()
  readonly dueDate: string;
}
