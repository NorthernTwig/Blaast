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

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _user = require('../DAL/user');

var user = _interopRequireWildcard(_user);

var _createUser = require('./middlewares/user/createUser');

var _createUser2 = _interopRequireDefault(_createUser);

var _updateUser = require('./middlewares/user/updateUser');

var _updateUser2 = _interopRequireDefault(_updateUser);

var _jwt = require('./middlewares/auth/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _baseUrl = require('./libs/baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

var _eventBus = require('./libs/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _pagination = require('./libs/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _generateSelf = require('./libs/generateSelf');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('users', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var limit, offset, users, usersWithSelf;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _context.prev = 2;
            _context.next = 5;
            return user.getAll(limit, offset);

          case 5:
            users = _context.sent;
            usersWithSelf = users.map(function (user) {
              return (0, _generateSelf.users)(user, ctx);
            });


            ctx.body = (0, _pagination2.default)(usersWithSelf, ctx, limit, offset);
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](2);

            ctx.throw(_context.t0.message, _context.t0.status);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).get('users/:_id', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    var _id, userInfo;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = ctx.params._id;
            _context2.prev = 1;
            _context2.next = 4;
            return user.getOne(_id);

          case 4:
            userInfo = _context2.sent;

            ctx.body = (0, _generateSelf.users)(userInfo, ctx);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);

            ctx.throw('Could not find a user with that id', 404);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).post('users', _createUser2.default, function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
    var _ctx$request$body, username, name, newUser;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, name = _ctx$request$body.name;
            _context3.prev = 1;
            _context3.next = 4;
            return user.create(ctx.request.body);

          case 4:
            newUser = _context3.sent;


            ctx.status = 201;
            ctx.set('Location', _baseUrl2.default + '/users/' + newUser._id);
            ctx.body = {
              status: ctx.status,
              location: ctx.response.header.location,
              self: (0, _generateSelf.main)(ctx)
            };
            _eventBus2.default.emit('user', { username: username, name: name });
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](1);

            if (_context3.t0.code === 11000) {
              ctx.throw('Username is already taken', 409);
            }
            ctx.throw('Could not create a user with those credentials', _context3.t0.status);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[1, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).patch('users', _updateUser2.default, _jwt2.default, function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
    var _id;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _id = ctx.state.user._id;
            _context4.prev = 1;
            _context4.next = 4;
            return user.update(_id, ctx.request.body);

          case 4:
            ctx.status = 204;
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](1);

            if (_context4.t0.code === 11000) {
              ctx.throw('Username is already taken', 409);
            }
            ctx.throw('Could not update user', _context4.t0.status);

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 7]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).delete('users', _jwt2.default, function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
    var _id;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = ctx.state.user._id;
            _context5.prev = 1;
            _context5.next = 4;
            return user.remove(_id);

          case 4:
            ctx.status = 204;
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5['catch'](1);

            ctx.throw('Could not delete user', _context5.t0.status);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 7]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

exports.default = router;