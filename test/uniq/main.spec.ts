import 'reflect-metadata';
import mongoose from 'mongoose';
import Database from 'src/database';
import Router from 'src/router';

Database.init = jest.fn().mockReturnValue(true);
Router.init = jest.fn().mockReturnValue(true);

import Server from 'src/main';

describe('function getOwnMethods', () => {
  afterAll(async () => {
    await (await Server).close();
    await mongoose.connection.close();
  });

  it('The Database and Router have been initialized after running main.ts', async () => {
    expect((Database.init as any).mock.calls.length).toBe(1);
    expect((Router.init as any).mock.calls.length).toBe(1);
  });
});
