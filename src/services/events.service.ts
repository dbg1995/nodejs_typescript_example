import Event, { IEvent } from '../models/event';
import ReqPagyDTO from '../dtos/concerns/req-pagy.dto';
import ResPagyDTO from '../dtos/concerns/res-pagy.dto';

export default class EventsService {
  public async findOne(id: string): Promise<IEvent> {
    return Event.findOne({ _id: id, deletedAt: null });
  }

  public async findMany(query: ReqPagyDTO): Promise<[IEvent[], ResPagyDTO]> {
    const { page, count } = query;
    const events = await Event.find()
      .where({ deletedAt: null, dueDate: { $lte: new Date() } })
      .sort({ dueDate: 'desc' })
      .skip((page - 1) * count)
      .limit(count);
    const total = await Event.count({
      deletedAt: null,
      dueDate: { $lte: new Date() },
    });
    const pagyInfo = {
      page,
      count: events.length,
      total,
      pageCount: Math.ceil(total / count),
    };

    return [events, pagyInfo];
  }

  public create(data: any): Promise<IEvent> {
    const event = new Event(data);

    return event.save();
  }

  public async update(id: string, data: any): Promise<IEvent> {
    await Event.findOneAndUpdate({ _id: id, deletedAt: null }, data);

    return Event.findOne({ _id: id, deletedAt: null });
  }

  public async delete(id: string): Promise<IEvent> {
    await Event.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
    );

    return Event.findById(id);
  }
}
