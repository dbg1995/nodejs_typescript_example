import Event, { IEvent } from '../models/event';

export default class EventsService {
  public async findOne(id: string): Promise<IEvent> {
    return Event.findOne({ _id: id, deletedAt: null });
  }

  public create(data: any): Promise<IEvent> {
    const event = new Event(data);

    return event.save();
  }
}
