import { Request } from 'express';
import { plainToClass } from 'class-transformer';

import UsersService from '../services/users.service';
import CreateUserDTO from '../dtos/users/create-user.dto';
import UserDTO from '../dtos/users/user.dto';
import Controller from '../decorators/controller.decorator';
import DTO from '../decorators/dto.decorator';
import { Post } from '../decorators/request-mapping.decorator';

@Controller('/api/v1/users')
export default class UserController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Post()
  public async create(
    @DTO(CreateUserDTO) req: Request,
  ): Promise<{ user: UserDTO }> {
    const user = await this.usersService.create(req.body);

    return {
      user: plainToClass(UserDTO, user),
    };
  }
}
