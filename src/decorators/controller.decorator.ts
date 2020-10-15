import { PATH_METADATA } from '../constants/controller.constant';

const Controller = (path: string): ClassDecorator => {
  return (target: any) => Reflect.defineMetadata(PATH_METADATA, path, target);
};

export default Controller;
