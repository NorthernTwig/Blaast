"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);

            ctx.status = _context.t0.status;
            ctx.body = {
              status: _context.t0.status,
              message: _context.t0.message,
              data: ctx.data
            };

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();