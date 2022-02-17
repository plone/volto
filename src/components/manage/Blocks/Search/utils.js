export const NONVALUE_OPERATIONS = new Set([
  'plone.app.querystring.operation.boolean.isFalse',
  'plone.app.querystring.operation.boolean.isTrue',
]);

export const hasNonValueOperation = (ops) => {
  return ops.filter((x) => NONVALUE_OPERATIONS.has(x)).length > 0;
};
