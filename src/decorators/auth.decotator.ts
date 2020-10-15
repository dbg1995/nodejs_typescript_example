import { AUTH_METADATA } from '../constants/controller.constant';

const Auth = (): ClassDecorator => {
  return (target: any) => Reflect.defineMetadata(AUTH_METADATA, true, target);
};

export default Auth;
