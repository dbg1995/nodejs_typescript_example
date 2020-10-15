import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';
import bodyParser from 'body-parser';

import Database from './database';
import { PORT } from './constants/app.constant';

async function bootstrap() {
  const app = express();

  app.use(bodyParser.json());

  await Database.init();

  return app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
  });
}

export default bootstrap();
