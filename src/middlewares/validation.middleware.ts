import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import BadRequestException from '../exceptions/bad-request.exception';
import { RequestMethod } from '../enums/request-method.enum';

const ValidationMiddleware = (dto: any) => {
  return async (req, res, next) => {
    if (!dto) {
      return next();
    }

    const data = transform(dto, req);
    const errors = await validate(data);
    if (!errors.length) {
      return next();
    }

    const message = errors
      .map((error: ValidationError) => Object.values(error.constraints))
      .join(',');
    next(new BadRequestException(message));
  };
};

function transform(dto, req) {
  switch (req.method.toLowerCase()) {
    case RequestMethod.GET:
      if (req.params.id) {
        return (req.params = plainToClass(dto, req.params));
      }
      return (req.query = plainToClass(dto, req.query));
    case RequestMethod.POST:
      return (req.body = plainToClass(dto, req.body));
  }
}

export default ValidationMiddleware;
