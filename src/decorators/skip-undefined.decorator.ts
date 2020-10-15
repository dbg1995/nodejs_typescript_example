import { ValidateIf } from 'class-validator';

const SkipUndefined = () => {
  return ValidateIf((object, value) => value !== undefined);
};

export default SkipUndefined;
