'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _UserSchema = require('../models/UserSchema');

var _UserSchema2 = _interopRequireDefault(_UserSchema);

var _PostSchema = require('../models/PostSchema');

var _PostSchema2 = _interopRequireDefault(_PostSchema);

var _CommentSchema = require('../models/CommentSchema');

var _CommentSchema2 = _interopRequireDefault(_CommentSchema);

var _WebhookSchema = require('../models/WebhookSchema');

var _WebhookSchema2 = _interopRequireDefault(_WebhookSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WEBHOOK_DATA = '_id ownerId endpoint scope secret';

var getAll = exports.getAll = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(limit, offset, _id) {
    var user;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _UserSchema2.default.findOne({ _id: _id });

          case 2:
            user = _context.sent;


            if (!user) {
              ctx.throw(403);
            }

            _context.next = 6;
            return _WebhookSchema2.default.find({ ownerId: _id }, WEBHOOK_DATA, { lean: true }).sort({ 'date': -1 }).limit(limit).skip(offset * limit);

          case 6:
            return _context.abrupt('return', _context.sent);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getAll(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getOne = exports.getOne = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx) {
    var _id, ownerId, user;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = ctx.params._id;
            ownerId = ctx.state.user._id;
            _context2.next = 4;
            return _UserSchema2.default.findOne({ _id: ownerId });

          case 4:
            user = _context2.sent;


            if (!user) {
              ctx.throw(403);
            }

            _context2.next = 8;
            return _WebhookSchema2.default.findOne({ ownerId: ownerId, _id: _id }, WEBHOOK_DATA, { lean: true });

          case 8:
            return _context2.abrupt('return', _context2.sent);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getOne(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

var create = exports.create = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx) {
    var _id, _ctx$request$body, endpoint, scope, secret, user;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = ctx.state.user._id;
            _ctx$request$body = ctx.request.body, endpoint = _ctx$request$body.endpoint, scope = _ctx$request$body.scope, secret = _ctx$request$body.secret;
            _context3.next = 4;
            return _UserSchema2.default.findOne({ _id: _id });

          case 4:
            user = _context3.sent;


            if (!user) {
              ctx.throw(403);
            }

            _context3.next = 8;
            return new _WebhookSchema2.default({
              ownerId: _id,
              endpoint: endpoint,
              scope: scope.trim().split(' '),
              secret: secret
            }).save();

          case 8:
            return _context3.abrupt('return', _context3.sent);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function create(_x5) {
    return _ref3.apply(this, arguments);
  };
}();

var update = exports.update = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, body) {
    var ownerId, _id, user;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ownerId = ctx.state.user._id;
            _id = ctx.params._id;
            _context4.next = 4;
            return _UserSchema2.default.findOne({ _id: ownerId });

          case 4:
            user = _context4.sent;


            if (!user) {
              ctx.throw(403);
            }

            _context4.next = 8;
            return _WebhookSchema2.default.findOneAndUpdate({ _id: _id, ownerId: ownerId }, body);

          case 8:
            return _context4.abrupt('return', _context4.sent);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function update(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

var remove = exports.remove = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx) {
    var _id, ownerId, user;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = ctx.params._id;
            ownerId = ctx.state.user._id;
            _context5.next = 4;
            return _UserSchema2.default.findOne({ _id: ownerId });

          case 4:
            user = _context5.sent;


            if (!user) {
              ctx.throw(403);
            }

            _context5.next = 8;
            return _WebhookSchema2.default.findOneAndRemove({ _id: _id, ownerId: ownerId });

          case 8:
            return _context5.abrupt('return', _context5.sent);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function remove(_x8) {
    return _ref5.apply(this, arguments);
  };
}();