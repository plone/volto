export const NONVALUE_OPERATIONS = new Set([
  'plone.app.querystring.operation.boolean.isFalse',
  'plone.app.querystring.operation.boolean.isTrue',
]);

export const DATE_OPERATIONS = new Set([
  'plone.app.querystring.operation.date.between',
]);

export const hasNonValueOperation = (ops) => {
  return ops.filter((x) => NONVALUE_OPERATIONS.has(x)).length > 0;
};

export const hasDateOperation = (ops) => {
  return ops.filter((x) => DATE_OPERATIONS.has(x)).length > 0;
};
