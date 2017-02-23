'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcryptAsPromised = require('bcrypt-as-promised');

var _auth = require('../DAL/auth');

var auth = _interopRequireWildcard(_auth);

var _checkCredential = require('./middlewares/auth/checkCredential');

var _checkCredential2 = _interopRequireDefault(_checkCredential);

var _UserSchema = require('../models/UserSchema');

var _UserSchema2 = _interopRequireDefault(_UserSchema);

var _generateSelf = require('./libs/generateSelf');

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var router = new _koaRouter2.default();

router.post('auth', _checkCredential2.default, function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var _ctx$request$body, username, password, user, correctPassword;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;
            _context.prev = 1;
            _context.next = 4;
            return auth.getUser(username);

          case 4:
            user = _context.sent;
            _context.next = 7;
            return (0, _bcryptAsPromised.compare)(password, user.password);

          case 7:
            correctPassword = _context.sent;

            ctx.status = 200;
            ctx.body = {
              token: _jsonwebtoken2.default.sign({ name: username, _id: user._id }, process.env.PUBLIC_SECRET, { expiresIn: '10 days' }),
              message: 'Logged in',
              self: (0, _generateSelf.main)(ctx)
            };
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](1);

            ctx.throw('A user with the entered credentials could not be found', 403);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

exports.default = router;