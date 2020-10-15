import { registerDecorator, ValidationOptions } from 'class-validator';

import { IS_FUTURE_ERROR } from '../constants/error.constant';

const IsFuture = (property: string, validationOptions?: ValidationOptions) => {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: 'isFuture',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: { message: property + IS_FUTURE_ERROR, ...validationOptions },
      validator: {
        validate(value: any) {
          return Date.now() < new Date(value).getTime();
        },
      },
    });
  };
};

export default IsFuture;
