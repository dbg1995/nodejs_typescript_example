import UserController from './controllers/users.controller';

import ValidationMiddleware from './middlewares/validation.middleware';
import { RequestMethod } from './enums/request-method.enum';
import { getOwnMethods } from './utils/shared.util';
import {
  PATH_METADATA,
  METHOD_METADATA,
} from './constants/controller.constant';

interface RouterInfo {
  path: string;
  method: RequestMethod;
  dto: string;
  handler: <TRequest, TResponse>(
    req?: TRequest,
    res?: TResponse,
    next?: () => void,
  ) => void;
}

export default class Router {
  private static controllers = [UserController];

  public static async init(app: any): Promise<any> {
    for (const controller of this.controllers) {
      const prefix: string = Reflect.getMetadata(PATH_METADATA, controller);
      const instance = new controller();

      const routers = this.getRouters(instance);

      for (const router of routers) {
        app[router.method](
          prefix + router.path,
          ValidationMiddleware(router.dto),
          router.handler,
        );
      }
    }
  }

  private static getRouters(controller: any): RouterInfo[] {
    const actions = getOwnMethods(controller);

    return actions.map(action => this.getRouter(controller, action));
  }

  private static getRouter(controller: any, action: any): RouterInfo {
    const path = Reflect.getMetadata(PATH_METADATA, action);
    const method: RequestMethod = Reflect.getMetadata(METHOD_METADATA, action);
    const dto = Reflect.getMetadata('dto', action);
    const handler = async (req, res, next) => {
      try {
        res.data = await action.bind(controller)(req);
        next();
      } catch (error) {
        next(error);
      }
    };

    return {
      path,
      method,
      dto,
      handler,
    };
  }
}
