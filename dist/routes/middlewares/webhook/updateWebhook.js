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
    var _id, _ctx$request$body, endpoint, scope, secret;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = ctx.params._id;
            _ctx$request$body = ctx.request.body, endpoint = _ctx$request$body.endpoint, scope = _ctx$request$body.scope, secret = _ctx$request$body.secret;


            if (_id === undefined) {
              ctx.throw('The parameter _id is missing', 422);
            }

            if (endpoint === undefined && scope === undefined && secret === undefined) {
              ctx.data = {
                endpoint: 'ex. http://someroute.com',
                scope: 'push comments posts users (seperate scopes with space)',
                secret: '(optional) ex. MonkeyBars'
              };
              ctx.throw('The title or body is missing. One of them is needed.', 400);
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