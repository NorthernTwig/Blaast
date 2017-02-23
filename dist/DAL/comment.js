'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.create = exports.getPostsComments = exports.getUsersComments = exports.getOne = exports.getAll = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTHOR_ID = 'author._id';
var DELETED_NAME = '[ DELETED ]';
var COMMENT_DATA = '_id body author post date';
var SALT_ROUNDS = 10;

var getAll = exports.getAll = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(limit, offset) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _CommentSchema2.default.find({}, COMMENT_DATA, { lean: true }).sort({ 'date': -1 }).limit(limit).skip(offset * limit);

          case 2:
            return _context.abrupt('return', _context.sent);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getOne = exports.getOne = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_id) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _CommentSchema2.default.findOne({ _id: _id }, COMMENT_DATA, { lean: true });

          case 2:
            return _context2.abrupt('return', _context2.sent);

          case 3:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getOne(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getUsersComments = exports.getUsersComments = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(limit, offset, _id) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _CommentSchema2.default.find((0, _defineProperty3.default)({}, AUTHOR_ID, _id), COMMENT_DATA, { lean: true }).sort({ 'date': -1 }).limit(limit).skip(offset * limit);

          case 2:
            return _context3.abrupt('return', _context3.sent);

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getUsersComments(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getPostsComments = exports.getPostsComments = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(limit, offset, _id) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _CommentSchema2.default.find({ 'post': _id }, COMMENT_DATA, { lean: true }).sort({ 'date': -1 }).limit(limit).skip(offset * limit);

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function getPostsComments(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

var create = exports.create = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx) {
    var post, body, _ctx$state$user, name, _id, user;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            post = ctx.params.post;
            body = ctx.request.body.body;
            _ctx$state$user = ctx.state.user, name = _ctx$state$user.name, _id = _ctx$state$user._id;
            _context5.next = 5;
            return _UserSchema2.default.find({ _id: _id });

          case 5:
            user = _context5.sent;


            if (!user) {
              ctx.throw(401);
            }

            _context5.next = 9;
            return new _CommentSchema2.default({
              body: body,
              post: post,
              author: {
                _id: _id,
                name: name
              }
            }).save();

          case 9:
            return _context5.abrupt('return', _context5.sent);

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function create(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

var update = exports.update = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx) {
    var _id, authorId, user;

    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _id = ctx.params._id;
            authorId = ctx.state.user._id;
            _context6.next = 4;
            return _UserSchema2.default.find({ _id: _id });

          case 4:
            user = _context6.sent;


            if (!user) {
              ctx.throw(401);
            }

            _context6.next = 8;
            return _CommentSchema2.default.findOneAndUpdate((0, _defineProperty3.default)({ _id: _id }, AUTHOR_ID, authorId), ctx.request.body);

          case 8:
            return _context6.abrupt('return', _context6.sent);

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function update(_x11) {
    return _ref6.apply(this, arguments);
  };
}();

var remove = exports.remove = function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx) {
    var _id, authorId;

    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _id = ctx.params._id;
            authorId = ctx.state.user._id;
            _context7.next = 4;
            return _CommentSchema2.default.findOneAndRemove((0, _defineProperty3.default)({ _id: _id }, AUTHOR_ID, authorId));

          case 4:
            return _context7.abrupt('return', _context7.sent);

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function remove(_x12) {
    return _ref7.apply(this, arguments);
  };
}();