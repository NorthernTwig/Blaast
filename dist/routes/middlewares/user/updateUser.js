'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var _ctx$request$body, username, password, name;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password, name = _ctx$request$body.name;


            if (username && username.length < 4) {
              credentialError(ctx);
            }
            if (password && password.length < 4) {
              credentialError(ctx);
            }
            if (name && name.length < 2) {
              credentialError(ctx);
            }

            _context.next = 6;
            return next();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var credentialError = function credentialError(ctx) {
  ctx.data = {
    username: 'Username has to be longer than 4 letters',
    password: 'Password has to be longer than 4 letters',
    name: 'Your first and lastname must be longer than 2'
  };
  ctx.throw('The username, password, or name is too short', 400);
};