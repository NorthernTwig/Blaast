'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaJwt = require('koa-jwt');

var _koaJwt2 = _interopRequireDefault(_koaJwt);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _mongo = require('./utils/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _errorHandler = require('./utils/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _acceptHandler = require('./utils/acceptHandler');

var _acceptHandler2 = _interopRequireDefault(_acceptHandler);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _entry = require('./routes/entry');

var _entry2 = _interopRequireDefault(_entry);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _post = require('./routes/post');

var _post2 = _interopRequireDefault(_post);

var _webhook = require('./routes/webhook');

var _webhook2 = _interopRequireDefault(_webhook);

var _comment = require('./routes/comment');

var _comment2 = _interopRequireDefault(_comment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var router = new _koaRouter2.default();
var PORT = 3000;

app.use((0, _koaCors2.default)());
app.use((0, _koaBodyparser2.default)());
app.use((0, _koaJson2.default)());
app.use(_errorHandler2.default);
app.use(_acceptHandler2.default);

router.get('/favicon.ico', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.status = 204;

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

router.use(_auth2.default.routes());
router.use(_webhook2.default.routes());
router.use(_comment2.default.routes());
router.use(_post2.default.routes());
router.use(_user2.default.routes());
router.use(_entry2.default.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, function () {
  return console.log('Listening on ' + PORT);
});