import { Expose, Type, Exclude } from 'class-transformer';

import EventDTO from './event.dto';
import ResPagyDTO from '../concerns/res-pagy.dto';

@Exclude()
export default class EventsDTO {
  @Expose()
  @Type(() => EventDTO)
  readonly events: EventDTO[];

  @Expose()
  @Type(() => ResPagyDTO)
  readonly pagyInfo: ResPagyDTO;
}
