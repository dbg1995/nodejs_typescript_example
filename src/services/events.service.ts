import Event, { IEvent } from '../models/event';

export default class EventsService {
  public create(data: any): Promise<IEvent> {
    const event = new Event(data);

    return event.save();
  }
}
