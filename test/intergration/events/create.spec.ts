import moment from 'moment';

import {
  initServer,
  closeServer,
  getResponse,
  login,
} from 'test/helpers/test.helper';
import createUser from 'test/fixtures/user.fixture';

describe('POST /api/v1/events', () => {
  let server;
  let accessToken;
  let user;
  let params;

  beforeAll(async () => {
    server = await initServer();
    user = await createUser();
    accessToken = await login(server, user);
  });

  afterAll(async () => {
    await closeServer(server);
  });

  beforeEach(() => {
    params = {
      name: 'a',
      description: 'a',
      startDate: moment()
        .add(1, 'days')
        .toDate(),
      dueDate: moment()
        .add(2, 'days')
        .toDate(),
    };
  });

  describe('Sucess', () => {
    it('should return a new event if the data is valid', async () => {
      const [status, data] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(200);
      expect(data.id).not.toBe(undefined);
      expect(data.name).toBe('a');
      expect(data.description).toBe('a');
      expect(data.createdAt).not.toBe(undefined);
      expect(data.updatedAt).not.toBe(undefined);
    });

    it('should return a new event if the description is empty', async () => {
      params.description = null;

      const [status, data] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(200);
      expect(data.id).not.toBe(undefined);
      expect(data.name).toBe('a');
      expect(data.description).toBe(null);
      expect(data.createdAt).not.toBe(undefined);
      expect(data.updatedAt).not.toBe(undefined);
    });
  });

  describe('Error', () => {
    it('should return 401 if the user is not logged in', async () => {
      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        '',
        params,
      );

      expect(status).toBe(401);
      expect(error).toBe('Please login to continue');
    });

    it('should return 400 if the name is longer than 255', async () => {
      params.name = Array(257).join('a');

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'name must be shorter than or equal to 255 characters',
      );
    });

    it('should return 400 if the name is not string', async () => {
      params.name = 1;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'name must be shorter than or equal to 255 characters,name must be a string',
      );
    });

    it('should return 400 if the name is empty', async () => {
      params.name = null;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'name must be shorter than or equal to 255 characters,name must be a string,name should not be empty',
      );
    });

    it('should return 400 if the description is longer than 1000', async () => {
      params.description = Array(1002).join('a');

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'description must be shorter than or equal to 1000 characters',
      );
    });

    it('should return 400 if the description is not string', async () => {
      params.description = 1;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'description must be shorter than or equal to 1000 characters,description must be a string',
      );
    });

    it('should return 400 if the startDate is in past', async () => {
      params.startDate = new Date('10/10/1995');

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe('startDate must be the date in the future');
    });

    it('should return 400 if the startDate is not Date', async () => {
      params.startDate = 1;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'startDate must be the date in the future,startDate must be a ISOString',
      );
    });

    it('should return 400 if the startDate is empty', async () => {
      params.startDate = null;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'startDate must be the date in the future,startDate must be a ISOString,startDate should not be empty',
      );
    });

    it('should return 400 if the dueDate is less than startDate', async () => {
      params.dueDate = new Date('10/10/1995');

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe('dueDate must be greater than the startDate');
    });

    it('should return 400 if the dueDate is not Date', async () => {
      params.dueDate = 1;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'dueDate must be greater than the startDate,dueDate must be a ISOString',
      );
    });

    it('should return 400 if the dueDate is empty', async () => {
      params.dueDate = null;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/events`,
        accessToken,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'dueDate must be greater than the startDate,dueDate must be a ISOString,dueDate should not be empty',
      );
    });
  });
});
