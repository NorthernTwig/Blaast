'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = undefined;

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

var _WebhookSchema = require('../models/WebhookSchema');

var _WebhookSchema2 = _interopRequireDefault(_WebhookSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTHOR_ID = 'author._id';
var AUTHOR_NAME = 'author.name';
var DELETED_NAME = '[ DELETED ]';
var USER_DATA = '_id username name';

var getAll = exports.getAll = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(limit, offset) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _UserSchema2.default.find({}, USER_DATA, { lean: true }).sort({ 'date': -1 }).limit(limit).skip(offset * limit);

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
            return _UserSchema2.default.findOne({ _id: _id }, USER_DATA, { lean: true });

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

var create = exports.create = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(body) {
    var password, username, name;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            password = body.password, username = body.username, name = body.name;
            _context3.next = 3;
            return new _UserSchema2.default({
              password: password,
              username: username,
              name: name
            }).save();

          case 3:
            return _context3.abrupt('return', _context3.sent);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function create(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

var update = exports.update = function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_id, body) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _UserSchema2.default.findOneAndUpdate({ _id: _id }, body);

          case 2:
            if (!body.username) {
              _context4.next = 7;
              break;
            }

            _context4.next = 5;
            return _PostSchema2.default.update((0, _defineProperty3.default)({}, AUTHOR_ID, _id), (0, _defineProperty3.default)({}, AUTHOR_NAME, body.username), { multi: true });

          case 5:
            _context4.next = 7;
            return _CommentSchema2.default.update((0, _defineProperty3.default)({}, AUTHOR_ID, _id), (0, _defineProperty3.default)({}, AUTHOR_NAME, body.username), { multi: true });

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function update(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

var remove = exports.remove = function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_id) {
    var postsByUser;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return _UserSchema2.default.findOneAndRemove({ _id: _id });

          case 2:
            _context6.next = 4;
            return _PostSchema2.default.find((0, _defineProperty3.default)({}, AUTHOR_ID, _id));

          case 4:
            postsByUser = _context6.sent;
            _context6.next = 7;
            return _PostSchema2.default.remove((0, _defineProperty3.default)({}, AUTHOR_ID, _id));

          case 7:
            _context6.next = 9;
            return _WebhookSchema2.default.remove({ ownerId: _id });

          case 9:
            _context6.next = 11;
            return _CommentSchema2.default.update((0, _defineProperty3.default)({}, AUTHOR_ID, _id), (0, _defineProperty3.default)({}, AUTHOR_NAME, DELETED_NAME), { multi: true });

          case 11:
            _context6.next = 13;
            return postsByUser.forEach(function () {
              var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(post) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return _CommentSchema2.default.remove({ post: post._id });

                      case 2:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, _callee5, undefined);
              }));

              return function (_x8) {
                return _ref6.apply(this, arguments);
              };
            }());

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function remove(_x7) {
    return _ref5.apply(this, arguments);
  };
}();