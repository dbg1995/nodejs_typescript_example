import { DTO_METADATA } from '../constants/controller.constant';

const DTO = (dto: any): ParameterDecorator => {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(DTO_METADATA, dto, target[propertyKey]);
  };
};

export default DTO;
