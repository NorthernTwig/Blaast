'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _WebhookSchema = require('../models/WebhookSchema');

var _WebhookSchema2 = _interopRequireDefault(_WebhookSchema);

var _jwt = require('./middlewares/auth/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _checkWebhook = require('./middlewares/webhook/checkWebhook');

var _checkWebhook2 = _interopRequireDefault(_checkWebhook);

var _updateWebhook = require('./middlewares/webhook/updateWebhook');

var _updateWebhook2 = _interopRequireDefault(_updateWebhook);

var _generateSelf = require('./libs/generateSelf');

var _pagination = require('./libs/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _baseUrl = require('./libs/baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

var _webhook = require('../DAL/webhook');

var webhook = _interopRequireWildcard(_webhook);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.get('webhooks', _jwt2.default, function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var limit, offset, _id, webhooks, webhooksWithSelf;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _id = ctx.state.user._id;
            _context.prev = 3;
            _context.next = 6;
            return webhook.getAll(limit, offset, _id);

          case 6:
            webhooks = _context.sent;
            webhooksWithSelf = webhooks.map(function (webhook) {
              return (0, _generateSelf.webhooks)(webhook, ctx);
            });

            ctx.body = (0, _pagination2.default)(webhooksWithSelf, ctx, limit, offset);
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](3);

            ctx.throw('Could not find any webhooks owned by you', 404);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('webhooks/:_id', _jwt2.default, function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    var webhookInfo;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return webhook.getOne(ctx);

          case 3:
            webhookInfo = _context2.sent;

            ctx.body = (0, _generateSelf.webhooks)(webhookInfo, ctx);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](0);

            ctx.throw('Could not find a webhook owned by you with that id', 404);

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).post('webhooks', _checkWebhook2.default, _jwt2.default, function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
    var newWebhook;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return webhook.create(ctx);

          case 3:
            newWebhook = _context3.sent;


            ctx.set('Location', _baseUrl2.default + '/webhooks/' + newWebhook._id);
            ctx.status = 201;
            ctx.body = {
              status: ctx.status,
              location: ctx.response.header.location,
              self: (0, _generateSelf.main)(ctx)
            };
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3['catch'](0);

            ctx.throw('Could not register webhook', _context3.t0.status);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 9]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).patch('webhooks/:_id', _updateWebhook2.default, _jwt2.default, function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
    var scope, body, updatedWebhook;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            scope = ctx.request.body.scope;
            body = ctx.request.body;


            if (scope) {
              body = Object.assign({}, body, {
                scope: scope.trim().split(' ')
              });
            }

            _context4.prev = 3;
            _context4.next = 6;
            return webhook.update(ctx, body);

          case 6:
            updatedWebhook = _context4.sent;


            if (updatedWebhook === null) {
              ctx.throw(403);
            }

            ctx.status = 204;
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](3);

            ctx.throw('Could not update webhook with that id', _context4.t0.status);

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[3, 11]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).delete('webhooks/:_id', _jwt2.default, function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
    var deletedWebhook;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return webhook.remove(ctx);

          case 3:
            deletedWebhook = _context5.sent;


            if (deletedWebhook === null) {
              ctx.throw(403);
            }

            ctx.status = 204;
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](0);

            ctx.throw('Could not delete webhook', _context5.t0.status);

          case 11:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 8]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

exports.default = router;