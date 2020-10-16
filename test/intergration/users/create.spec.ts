import { initServer, closeServer, getResponse } from 'test/helpers/test.helper';
import createUser from 'test/fixtures/user.fixture';

describe('POST /api/v1/users', () => {
  let server;
  let user;
  let params;

  beforeAll(async () => {
    server = await initServer();
    user = await createUser();
  });

  afterAll(async () => {
    await closeServer(server);
  });

  beforeEach(() => {
    params = {
      username: 'a',
      password: 'a',
    };
  });

  describe('Sucess', () => {
    it('should return a new user if the data is valid', async () => {
      const [status, data] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(200);
      expect(data.user.id).not.toBe(undefined);
      expect(data.user.username).toBe('a');
      expect(data.user.password).toBe(undefined);
      expect(data.user.createdAt).not.toBe(undefined);
      expect(data.user.updatedAt).not.toBe(undefined);
      expect(data.auth.accessToken).not.toBe(undefined);
    });
  });

  describe('Error', () => {
    it('should return 400 if the username does exists', async () => {
      params.username = user.username;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe('username already exists');
    });

    it('should return 400 if the username is longer than 255', async () => {
      params.username = Array(257).join('a');

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'username must be shorter than or equal to 255 characters',
      );
    });

    it('should return 400 if the username is not string', async () => {
      params.username = 1;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'username must be shorter than or equal to 255 characters,username must be a string',
      );
    });

    it('should return 400 if the username is empty', async () => {
      params.username = null;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'username must be shorter than or equal to 255 characters,username must be a string,username should not be empty',
      );
    });

    it('should return 400 if the password is longer than 255', async () => {
      params.password = Array(257).join('a');

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'password must be shorter than or equal to 255 characters',
      );
    });

    it('should return 400 if the password is not string', async () => {
      params.password = 1;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'password must be shorter than or equal to 255 characters,password must be a string',
      );
    });

    it('should return 400 if the password is empty', async () => {
      params.password = null;

      const [status, error] = await getResponse(
        server,
        'post',
        `/api/v1/users`,
        null,
        params,
      );

      expect(status).toBe(400);
      expect(error).toBe(
        'password must be shorter than or equal to 255 characters,password must be a string,password should not be empty',
      );
    });
  });
});
