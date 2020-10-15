import { IsInt, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

import {
  PAGY_PAGE_DEFAULT,
  PAGY_COUNT_DEFAULT,
} from '../../constants/app.constant';

export default class ReqPagyDTO {
  @IsOptional()
  @Transform(parseInt)
  @IsInt()
  @Min(1)
  readonly page = PAGY_PAGE_DEFAULT;

  @IsOptional()
  @Transform(parseInt)
  @IsInt()
  @Min(1)
  readonly count = PAGY_COUNT_DEFAULT;
}
