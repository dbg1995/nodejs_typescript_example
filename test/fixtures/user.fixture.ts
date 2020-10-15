import faker from 'faker';
import User, { IUser } from 'src/models/user';

export default async function createUser(
  data: Partial<IUser> = {},
): Promise<IUser> {
  const password = data.password || faker.lorem.text();

  const user = new User({
    username: data.username || faker.name.lastName(),
    password,
  });
  await user.save();
  user.password = password;

  return user;
}
