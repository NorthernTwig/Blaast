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

var _CommentSchema = require('../models/CommentSchema');

var _CommentSchema2 = _interopRequireDefault(_CommentSchema);

var _jwt = require('./middlewares/auth/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

var _comment = require('../DAL/comment');

var comment = _interopRequireWildcard(_comment);

var _checkComment = require('./middlewares/comment/checkComment');

var _checkComment2 = _interopRequireDefault(_checkComment);

var _pagination = require('./libs/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _eventBus = require('./libs/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _generateSelf = require('./libs/generateSelf');

var _baseUrl = require('./libs/baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('comments', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var limit, offset, comments, commentsWithSelf;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _context.prev = 2;
            _context.next = 5;
            return comment.getAll(limit, offset);

          case 5:
            comments = _context.sent;
            commentsWithSelf = comments.map(function (comment) {
              return (0, _generateSelf.comments)(comment, ctx);
            });

            ctx.body = (0, _pagination2.default)(commentsWithSelf, ctx, limit, offset);
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
}()).get('comments/:_id', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    var _id, commentInfo;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = ctx.params._id;
            _context2.prev = 1;
            _context2.next = 4;
            return comment.getOne(_id);

          case 4:
            commentInfo = _context2.sent;

            ctx.body = (0, _generateSelf.comments)(commentInfo, ctx);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);

            ctx.throw('Could not find a comment with that id', 404);

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
}()).get('comments/users/:_id', function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
    var limit, offset, _id, comments, commentsWithSelf;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _id = ctx.params._id;
            _context3.prev = 3;
            _context3.next = 6;
            return comment.getUsersComments(limit, offset, _id);

          case 6:
            comments = _context3.sent;
            commentsWithSelf = comments.map(function (comment) {
              return (0, _generateSelf.comments)(comment, ctx);
            });

            ctx.body = (0, _pagination2.default)(commentsWithSelf, ctx, limit, offset);
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](3);

            ctx.throw('Could not find comments by user with that id', 404);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).get('comments/posts/:_id', function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
    var limit, offset, _id, comments, commentsWithSelf;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _id = ctx.params._id;
            _context4.prev = 3;
            _context4.next = 6;
            return comment.getPostsComments(limit, offset, _id);

          case 6:
            comments = _context4.sent;
            commentsWithSelf = comments.map(function (comment) {
              return (0, _generateSelf.comments)(comment, ctx);
            });

            ctx.body = (0, _pagination2.default)(commentsWithSelf, ctx, limit, offset);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](3);

            ctx.throw('Could not find comments on post with that id', _context4.t0.status);

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
}()).post('comments/posts/:post', _jwt2.default, _checkComment2.default, function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
    var newComment;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return comment.create(ctx);

          case 3:
            newComment = _context5.sent;


            ctx.set('Location', _baseUrl2.default + '/comments/' + newComment._id);
            ctx.status = 201;
            ctx.body = {
              status: ctx.status,
              location: ctx.response.header.location,
              self: (0, _generateSelf.main)(ctx)
            };
            _eventBus2.default.emit('comment', newComment);
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5['catch'](0);

            ctx.throw('Could not create comment on post with that Id', 400);

          case 13:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 10]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()).patch('/comments/:_id', _jwt2.default, _checkComment2.default, function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
    var updatedComment;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return comment.update(ctx);

          case 3:
            updatedComment = _context6.sent;


            if (updatedComment === null) {
              ctx.throw(403);
            }

            ctx.status = 204;
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            ctx.throw('Could not update comment', _context6.t0.status);

          case 11:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 8]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}()).delete('/comments/:_id', _jwt2.default, function () {
  var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(ctx, next) {
    var deletedComment;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return comment.remove(ctx);

          case 3:
            deletedComment = _context7.sent;


            if (!deletedComment) {
              ctx.throw(404);
            }

            ctx.status = 204;
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](0);

            ctx.throw('Could not delete comment', _context7.t0.status);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 8]]);
  }));

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());

exports.default = router;