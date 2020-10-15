import BadRequestException from '../exceptions/bad-request.exception';
import { INTERNAL_SERVER_ERROR } from '../constants/error.constant';
import { INTERNAL_SERVER_ERROR_CODE } from '../constants/http-code.constant';

const ErrorMiddleware = (error, req, res, _) => {
  switch (error.constructor) {
    case BadRequestException:
      res.status(error.status).json({ data: null, error: error.message });
      break;
    default:
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ data: null, error: INTERNAL_SERVER_ERROR });
      break;
  }
};

export default ErrorMiddleware;
