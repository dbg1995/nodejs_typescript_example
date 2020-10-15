import { RequestMethod } from '../enums/request-method.enum';
import {
  PATH_METADATA,
  METHOD_METADATA,
} from '../constants/controller.constant';

const createMappingDecorator = (method: RequestMethod) => (
  path = '/',
): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);

    return descriptor;
  };
};

export const Post = createMappingDecorator(RequestMethod.POST);
export const Get = createMappingDecorator(RequestMethod.GET);
export const Put = createMappingDecorator(RequestMethod.PUT);
export const Patch = createMappingDecorator(RequestMethod.PATCH);
export const Delete = createMappingDecorator(RequestMethod.DELETE);
