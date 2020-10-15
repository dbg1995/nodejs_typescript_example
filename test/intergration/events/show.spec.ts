import { ObjectID } from 'mongodb';
import request from 'supertest';

import {
  initServer,
  closeServer,
  getResponse,
  login,
} from 'test/helpers/test.helper';
import createEvent from 'test/fixtures/event.fixture';
import createUser from 'test/fixtures/user.fixture';
import Event from 'src/models/event';

describe('GET /api/v1/events/:id', () => {
  let server;
  let accessToken;
  let user;
  let event;
  let id;

  beforeAll(async () => {
    server = await initServer();
    user = await createUser();
    accessToken = await login(server, user);
    event = await createEvent();

    await createEvent();
  });

  afterAll(async () => {
    await closeServer(server);
  });

  beforeEach(() => {
    id = event.id;
  });

  describe('Sucess', () => {
    it('should return an event by id', async () => {
      const [status, data] = await getResponse(
        server,
        'get',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );

      expect(status).toBe(200);
      expect(data.id).toBe(event.id);
      expect(data.name).toBe(event.name);
      expect(data.description).toBe(event.description);

      expect(data.startDate).toBe(event.startDate.toISOString());
      expect(data.dueDate).toBe(event.dueDate.toISOString());
      expect(data.createdAt).toBe(event.createdAt.toISOString());
      expect(data.updatedAt).toBe(event.updatedAt.toISOString());
    });

    it('should return null if the event does not exists', async () => {
      id = new ObjectID().toHexString();

      const [status, data] = await getResponse(
        server,
        'get',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );

      expect(status).toBe(200);
      expect(data).toBe(null);
    });

    it('should return null if the event was deleted', async () => {
      await Event.findOneAndUpdate(
        { _id: id, deletedAt: null },
        { deletedAt: new Date() },
      );

      const [status, data] = await getResponse(
        server,
        'get',
        `/api/v1/events/${id}`,
        accessToken,
        null,
      );

      expect(status).toBe(200);
      expect(data).toBe(null);
    });
  });

  describe('Error', () => {
    it('should return 401 if the user is not logged in', async () => {
      const res = await request(server).get(`/api/v1/events/${event.id}`);

      expect(res.status).toBe(401);
    });

    it('should return 400 if the id is not valid', async () => {
      const [status, error] = await getResponse(
        server,
        'get',
        `/api/v1/events/1`,
        accessToken,
        null,
      );

      expect(status).toBe(400);
      expect(error).toBe('id must be a mongodb id');
    });
  });
});
