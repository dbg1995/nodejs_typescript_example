import 'dotenv/config';
process.env.MONGOOSE_URI = process.env.TEST_MONGOOSE_URI;

import 'reflect-metadata';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import request from 'supertest';

import Database from 'src/database';
import Router from 'src/router';
import ErrorMiddleware from 'src/middlewares/error.middleware';
import ResponseMiddleware from 'src/middlewares/response.middleware';
import { PORT } from 'src/constants/app.constant';
import User, { IUser } from 'src/models/user';
import Event from 'src/models/event';

export async function initServer(): Promise<http.Server> {
  jest.setTimeout(10000);
  const app = express();

  app.use(bodyParser.json());

  await Router.init(app);
  await Database.init();

  app.use(ErrorMiddleware);
  app.use(ResponseMiddleware);

  return app.listen(PORT);
}

export async function closeServer(server: http.Server) {
  await clearDatabase();
  await server.close();
  await mongoose.connection.close();
}

export async function login(server: http.Server, user: IUser): Promise<string> {
  const res = await request(server)
    .post('/api/v1/auth')
    .send({
      username: user.username,
      password: user.password,
    });
  return JSON.parse(res.text).data.auth.accessToken;
}

export async function getResponse(
  server: http.Server,
  method: string,
  path: string,
  accessToken = '',
  params = {},
) {
  const res = await request(server)
    [method](path)
    .set('authorization', `Bearer ${accessToken}`)
    .send(params)
    .query(params);

  return [res.status, JSON.parse(res.text).data || JSON.parse(res.text).error];
}

const clearDatabase = async () => {
  await Event.remove({});
  await User.remove({});
};
