import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';

import Router from './router';
import Database from './database';
import ResponseMiddleware from './middlewares/response.middleware';
import { PORT } from './constants/app.constant';

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());

  await Router.init(app);
  await Database.init();

  app.use(ResponseMiddleware);

  return app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
  });
}

export default bootstrap();
