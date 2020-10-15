import faker from 'faker';
import Event, { IEvent } from 'src/models/event';

export default function createEvent(
  data: Partial<IEvent> = {},
): Promise<IEvent> {
  const event = new Event({
    name: data.name || faker.lorem.words(10),
    startDate: data.startDate || faker.date.past(),
    dueDate: data.dueDate || faker.date.future(),
    description: faker.lorem.words(10),
    deletedAt: data.deletedAt,
  });

  return event.save();
}
