import moment from 'moment';

import {
  initServer,
  closeServer,
  getResponse,
  login,
} from 'test/helpers/test.helper';
import createEvent from 'test/fixtures/event.fixture';
import createUser from 'test/fixtures/user.fixture';

describe('GET /api/v1/events', () => {
  let server;
  let accessToken;
  let user;
  let event2DaysAgo;
  let event1DayAgo;
  let event1DayLater;
  let event2DaysLater;
  let deletedEvent;
  let params;

  beforeAll(async () => {
    server = await initServer();
    user = await createUser();
    accessToken = await login(server, user);

    event2DaysAgo = await createEvent({
      dueDate: moment()
        .add(-2, 'days')
        .toDate(),
    });
    event1DayAgo = await createEvent({
      dueDate: moment()
        .add(-1, 'days')
        .toDate(),
    });
    event1DayLater = await createEvent({
      dueDate: moment()
        .add(1, 'days')
        .toDate(),
    });
    event2DaysLater = await createEvent({
      dueDate: moment()
        .add(2, 'days')
        .toDate(),
    });
    deletedEvent = await createEvent({
      deletedAt: new Date(),
    });
  });

  afterAll(async () => {
    await closeServer(server);
  });

  beforeEach(async () => {
    params = { page: 1, count: 10 };
  });

  describe('Sucess', () => {
    it('should return past events and sort by dueDate desc', async () => {
      const [status, data] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        accessToken,
        params,
      );
      const { events, pagyInfo } = data;
      const expectedPagyInfo = { page: 1, count: 2, total: 2, pageCount: 1 };
      expect(status).toBe(200);
      expect(pagyInfo).toEqual(expectedPagyInfo);
      expect(events.length).toBe(2);
      expect(events[0].id).toBe(event1DayAgo.id);
      expect(events[1].id).toBe(event2DaysAgo.id);
    });

    it('should return one event if count = 1', async () => {
      params.count = 1;

      const [status, data] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        accessToken,
        params,
      );
      const { events, pagyInfo } = data;
      const expectedPagyInfo = { page: 1, count: 1, total: 2, pageCount: 2 };
      expect(status).toBe(200);
      expect(pagyInfo).toEqual(expectedPagyInfo);
      expect(events.length).toBe(1);
      expect(events[0].id).toBe(event1DayAgo.id);
    });
  });

  describe('Error', () => {
    it('should return 401 if the user is not logged in', async () => {
      const [status, error] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        null,
        params,
      );

      expect(status).toBe(401);
      expect(error).toBe('Please login to continue');
    });

    it('should return 400 if the count is not number', async () => {
      params.count = 'a';

      const [status, error] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'count must not be less than 1,count must be an integer number',
      );
    });

    it('should return 400 if the count is less than 1', async () => {
      params.count = '-1';

      const [status, error] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe('count must not be less than 1');
    });

    it('should return 400 if the page is not number', async () => {
      params.page = 'a';

      const [status, error] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'page must not be less than 1,page must be an integer number',
      );
    });

    it('should return 400 if the page is less than 1', async () => {
      params.page = '-1';

      const [status, error] = await getResponse(
        server,
        'get',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe('page must not be less than 1');
    });
  });
});
