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

var _PostSchema = require('../models/PostSchema');

var _PostSchema2 = _interopRequireDefault(_PostSchema);

var _CommentSchema = require('../models/CommentSchema');

var _CommentSchema2 = _interopRequireDefault(_CommentSchema);

var _post = require('../DAL/post');

var post = _interopRequireWildcard(_post);

var _baseUrl = require('./libs/baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

var _pagination = require('./libs/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _eventBus = require('./libs/eventBus');

var _eventBus2 = _interopRequireDefault(_eventBus);

var _generateSelf = require('./libs/generateSelf');

var _createPost = require('./middlewares/post/createPost');

var _createPost2 = _interopRequireDefault(_createPost);

var _deletePost = require('./middlewares/post/deletePost');

var _deletePost2 = _interopRequireDefault(_deletePost);

var _updatePost = require('./middlewares/post/updatePost');

var _updatePost2 = _interopRequireDefault(_updatePost);

var _jwt = require('./middlewares/auth/jwt');

var _jwt2 = _interopRequireDefault(_jwt);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('posts', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
    var limit, offset, posts, postsWithSelf;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _context.prev = 2;
            _context.next = 5;
            return post.getAll(limit, offset);

          case 5:
            posts = _context.sent;
            postsWithSelf = posts.map(function (post) {
              return (0, _generateSelf.posts)(post, ctx);
            });

            ctx.body = (0, _pagination2.default)(postsWithSelf, ctx, limit, offset);
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
}()).get('posts/:_id', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(ctx, next) {
    var _id, postInfo;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _id = ctx.params._id;
            _context2.prev = 1;
            _context2.next = 4;
            return post.getOne(_id);

          case 4:
            postInfo = _context2.sent;

            ctx.body = (0, _generateSelf.posts)(postInfo, ctx);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](1);

            ctx.throw('Could not find a post with that id', 404);

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
}()).get('posts/users/:_id', function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(ctx, next) {
    var _id, limit, offset, posts, postsWithSelf;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _id = ctx.params._id;
            limit = parseInt(ctx.query.limit) || 10;
            offset = parseInt(ctx.query.offset) || 0;
            _context3.prev = 3;
            _context3.next = 6;
            return post.getUsersPost(_id, limit, offset);

          case 6:
            posts = _context3.sent;
            postsWithSelf = posts.map(function (post) {
              return (0, _generateSelf.posts)(post, ctx);
            });

            ctx.body = (0, _pagination2.default)(postsWithSelf, ctx, limit, offset);
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3['catch'](3);

            _context3.t0.status = _context3.t0.name === 'CastError' ? 404 : 500;
            ctx.throw('Could not find posts by user with that id', _context3.t0.status);

          case 15:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[3, 11]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()).post('posts', _createPost2.default, _jwt2.default, function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(ctx, next) {
    var newPost;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return post.create(ctx);

          case 3:
            newPost = _context4.sent;

            ctx.set('Location', _baseUrl2.default + '/posts/' + newPost._id);
            ctx.status = 201;
            ctx.body = {
              status: ctx.status,
              location: ctx.response.header.location,
              self: (0, _generateSelf.main)(ctx)
            };
            _eventBus2.default.emit('post', newPost);
            _context4.next = 13;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4['catch'](0);

            ctx.throw('Could not create post', 400);

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 10]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()).patch('posts/:_id', _updatePost2.default, _jwt2.default, function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(ctx, next) {
    var updatedPost;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return post.update(ctx);

          case 3:
            updatedPost = _context5.sent;


            if (updatedPost === null) {
              ctx.throw(403);
            }
            ctx.status = 204;
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](0);

            ctx.throw('Could not update post with that id', _context5.t0.status);

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
}()).delete('posts/:_id', _deletePost2.default, _jwt2.default, function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(ctx, next) {
    var deletedPost;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return post.remove(ctx);

          case 3:
            deletedPost = _context6.sent;


            if (deletedPost === null) {
              ctx.throw(403);
            }

            ctx.status = 204;
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](0);

            ctx.throw('Could not delete post', _context6.t0.status);

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
}());

exports.default = router;