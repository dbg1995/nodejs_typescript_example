import { Request } from 'express';

import UsersService from '../services/users.service';
import Controller from '../decorators/controller.decorator';
import { Post } from '../decorators/request-mapping.decorator';

@Controller('/api/v1/users')
export default class UserController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Post()
  public async create(req: Request) {
    const user = await this.usersService.create(req.body);

    return user;
  }
}
