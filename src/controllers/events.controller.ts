import { Request } from 'express';
import { plainToClass } from 'class-transformer';

import EventsService from '../services/events.service';
import EventDTO from '../dtos/events/event.dto';
import CreateEventDTO from '../dtos/events/create-event.dto';
import Controller from '../decorators/controller.decorator';
import Auth from '../decorators/auth.decotator';
import DTO from '../decorators/dto.decorator';
import { Post } from '../decorators/request-mapping.decorator';

@Controller('/api/v1/events')
@Auth()
export default class EventsController {
  private eventsService: EventsService;

  constructor() {
    this.eventsService = new EventsService();
  }

  @Post()
  public async create(@DTO(CreateEventDTO) req: Request): Promise<EventDTO> {
    const event = await this.eventsService.create(req.body);

    return plainToClass(EventDTO, event);
  }
}
