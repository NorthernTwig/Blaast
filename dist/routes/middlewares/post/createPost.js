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
    var _ctx$request$body, title, body, newPostObject, dataFields;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, title = _ctx$request$body.title, body = _ctx$request$body.body;
            newPostObject = {
              title: title,
              body: body
            };

            dataFields = function dataFields() {
              return {
                title: 'The title of the blog post',
                body: 'The body of the blog post'
              };
            };

            if (Object.values(newPostObject).includes(undefined)) {
              ctx.data = dataFields();
              ctx.throw('The title or body data does not exist', 400);
            }

            if (!(newPostObject.title.trim().length === 0 || newPostObject.body.trim().length === 0)) {
              _context.next = 8;
              break;
            }

            ctx.data = dataFields();
            _context.next = 8;
            return ctx.throw('The title or body is empty', 400);

          case 8:
            _context.next = 10;
            return next();

          case 10:
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