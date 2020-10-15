import 'reflect-metadata';

import { getOwnMethods } from 'src/utils/shared.util';
import EventsController from 'src/controllers/events.controller';

describe('function getOwnMethods', () => {
  it('should return all method of object', async () => {
    const controller = new EventsController();
    const methods = getOwnMethods(controller);

    expect(methods.length).toBe(5);
    expect(methods).toEqual([
      controller.show,
      controller.index,
      controller.create,
      controller.update,
      controller.destroy,
    ]);
  });
});
