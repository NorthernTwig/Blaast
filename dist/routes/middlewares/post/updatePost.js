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
    var _id, _ctx$request$body, title, body, newPostObject;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _id = ctx.params._id;
            _ctx$request$body = ctx.request.body, title = _ctx$request$body.title, body = _ctx$request$body.body;
            newPostObject = {
              _id: _id,
              title: title,
              body: body
            };


            if (_id === undefined) {
              ctx.throw('The parameter _id is missing', 422);
            }

            if (title === undefined && body === undefined) {
              ctx.data = {
                title: 'ex. How to make an REST api',
                body: 'ex. Your start of with..'
              };
              ctx.throw('The title or body is missing. One of them is needed.', 400);
            }

            _context.next = 7;
            return next();

          case 7:
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