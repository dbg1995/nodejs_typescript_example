import moment from 'moment';
import { ObjectID } from 'mongodb';

import {
  initServer,
  closeServer,
  getResponse,
  login,
} from 'test/helpers/test.helper';
import createUser from 'test/fixtures/user.fixture';
import createEvent from 'test/fixtures/event.fixture';
import User from 'src/models/user';
import Event from 'src/models/event';

describe('Delete /api/v1/events/:id', () => {
  let server;
  let accessToken;
  let user;
  let id;
  let event;

  beforeAll(async () => {
    server = await initServer();
    user = await createUser();
    event = await createEvent();
    accessToken = await login(server, user);
  });

  afterAll(async () => {
    await closeServer(server);
  });

  beforeEach(() => {
    id = event.id;
  });

  describe('Sucess', () => {
    it('should return a deleted event if the data is valid', async () => {
      const [status, data] = await getResponse(
        server,
        'delete',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );

      expect(status).toBe(200);
      expect(data.id).toBe(event.id);
    });

    it('should return null if the event does not exists', async () => {
      id = new ObjectID().toHexString();

      const [status, data] = await getResponse(
        server,
        'delete',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );

      expect(status).toBe(200);
      expect(data).toBe(null);
    });

    it('should return deleted if the event was deleted', async () => {
      const [status, data] = await getResponse(
        server,
        'delete',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );
      event = await Event.findById(event.id);

      expect(status).toBe(200);
      expect(data.id).toBe(event.id);
      expect(event.deletedAt).not.toBe(undefined);
    });
  });

  describe('Error', () => {
    it('should return 400 if the id is not valid', async () => {
      const [status, error] = await getResponse(
        server,
        'delete',
        `/api/v1/events/1`,
        accessToken,
        null,
      );

      expect(status).toBe(400);
      expect(error).toBe('id must be a mongodb id');
    });

    it('should return 401 if the user is not logged in', async () => {
      await User.findOneAndUpdate(
        { _id: user.id, deletedAt: null },
        { deletedAt: new Date() },
      );

      const [status, error] = await getResponse(
        server,
        'delete',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );

      expect(status).toBe(401);
      expect(error).toBe('Please login to continue');
    });
  });
});
