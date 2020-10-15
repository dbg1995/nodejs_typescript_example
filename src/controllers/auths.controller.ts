import { Request } from 'express';
import { plainToClass } from 'class-transformer';

import UsersService from '../services/users.service';
import LoginDTO from '../dtos/auths/login.dto';
import UserDTO from '../dtos/users/user.dto';
import AuthDTO from '../dtos/auths/auth.dto';
import DTO from '../decorators/dto.decorator';
import Controller from '../decorators/controller.decorator';
import { Post } from '../decorators/request-mapping.decorator';

@Controller('/api/v1/auth')
export default class AuthsController {
  private userService;

  constructor() {
    this.userService = new UsersService();
  }

  @Post()
  async create(
    @DTO(LoginDTO) req: Request,
  ): Promise<{ user: UserDTO; auth: AuthDTO }> {
    const user = await this.userService.authenticate(req.body);
    const accessToken = this.userService.generateToken(user.id, user.username);

    return {
      user: plainToClass(UserDTO, user),
      auth: plainToClass(AuthDTO, { accessToken }),
    };
  }
}
