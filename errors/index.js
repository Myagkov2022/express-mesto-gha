const { UnauthorizedError } = require('./unauth-err');
const { NotFoundError } = require('./not-found-err');
const { ForbiddenError } = require('./forbidden-error');
const { ValidationError } = require('./validation-err');

module.exports = {
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  ValidationError,
};
