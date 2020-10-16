import { Request } from 'express';
import { plainToClass } from 'class-transformer';

import EventsService from '../services/events.service';
import EventDTO from '../dtos/events/event.dto';
import EventsDTO from '../dtos/events/events.dto';
import ValidateIdDTO from '../dtos/concerns/validate-id.dto';
import ReqPagyDTO from '../dtos/concerns/req-pagy.dto';
import CreateEventDTO from '../dtos/events/create-event.dto';
import UpdateEventDTO from '../dtos/events/update-event.dto';
import Controller from '../decorators/controller.decorator';
import Auth from '../decorators/auth.decotator';
import DTO from '../decorators/dto.decorator';
import {
  Get,
  Post,
  Delete,
  Patch,
} from '../decorators/request-mapping.decorator';

@Controller('/api/v1/events')
@Auth()
export default class EventsController {
  private eventsService: EventsService;

  constructor() {
    this.eventsService = new EventsService();
  }

  @Get('/:id')
  public async show(@DTO(ValidateIdDTO) req: Request): Promise<EventDTO> {
    const event = await this.eventsService.findOne(req.params.id);

    return plainToClass(EventDTO, event);
  }

  @Get()
  public async index(@DTO(ReqPagyDTO) req: Request): Promise<EventsDTO> {
    const [events, pagyInfo] = await this.eventsService.findMany(
      req.query as any,
    );

    return plainToClass(EventsDTO, { events, pagyInfo });
  }

  @Post()
  public async create(@DTO(CreateEventDTO) req: Request): Promise<EventDTO> {
    const event = await this.eventsService.create(req.body);

    return plainToClass(EventDTO, event);
  }

  @Patch('/:id')
  public async update(@DTO(UpdateEventDTO) req: Request): Promise<EventDTO> {
    const event = await this.eventsService.update(req.params.id, req.body);

    return plainToClass(EventDTO, event);
  }

  @Delete('/:id')
  public async destroy(@DTO(ValidateIdDTO) req: Request): Promise<EventDTO> {
    const event = await this.eventsService.delete(req.params.id);

    return plainToClass(EventDTO, event);
  }
}
