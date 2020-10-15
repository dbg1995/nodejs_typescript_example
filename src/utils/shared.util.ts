export const getOwnMethods = (object: any) => {
  const propertype = Object.getPrototypeOf(object);
  const properties = Object.getOwnPropertyNames(propertype);

  return properties
    .filter(p => typeof object[p] === 'function' && p != 'constructor')
    .map(p => object[p]);
};
