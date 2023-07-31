const { UnauthorizedError } = require('./unauth-err');
const { NotFoundError } = require('./not-found-err');
const { ForbiddenError } = require('./forbidden-error');
const { ValidationError } = require('./validation-err');
const { ConflictError } = require('./conflict-err');

module.exports = {
  UnauthorizedError,
  NotFoundError,
  ForbiddenError,
  ValidationError,
  ConflictError,
};
