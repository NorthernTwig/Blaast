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
    var _ctx$request$body, endpoint, scope;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, endpoint = _ctx$request$body.endpoint, scope = _ctx$request$body.scope;


            if (endpoint === undefined && scope === undefined) {
              ctx.data = {
                endpoint: 'ex. http://someroute.com',
                scope: 'push comments posts users (seperate scopes with space)',
                secret: '(optional) ex. MonkeyBars'
              };
              ctx.throw('The endpoint or scope is missing', 400);
            }

            _context.next = 4;
            return next();

          case 4:
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