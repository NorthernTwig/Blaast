'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = exports.webhooks = exports.users = exports.posts = exports.comments = undefined;

var _baseUrl = require('./baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comments = exports.comments = function comments(comment, ctx) {
  var path = ctx.req._parsedUrl.pathname;

  return Object.assign({}, comment, {
    post: {
      _id: comment.post,
      self: _baseUrl2.default + '/posts/' + comment.post
    },
    author: Object.assign({}, comment.author, {
      self: _baseUrl2.default + '/users/' + comment.author._id
    }),
    self: _baseUrl2.default + '/comments/' + comment._id
  });
};

var posts = exports.posts = function posts(post, ctx) {

  return Object.assign({}, post, {
    author: Object.assign({}, post.author, {
      self: _baseUrl2.default + '/users/' + post.author._id
    }),
    comments: _baseUrl2.default + '/comments/posts/' + post._id,
    self: _baseUrl2.default + '/posts/' + post._id
  });
};

var users = exports.users = function users(user, ctx) {
  var path = ctx.req._parsedUrl.pathname;

  return Object.assign({}, user, {
    self: _baseUrl2.default + '/users/' + user._id,
    posts: _baseUrl2.default + '/posts/users/' + user._id,
    comments: _baseUrl2.default + '/comments/users/' + user._id
  });
};

var webhooks = exports.webhooks = function webhooks(webhook, ctx) {
  var path = ctx.req._parsedUrl.pathname;

  return Object.assign({}, webhook, {
    self: _baseUrl2.default + '/webhooks/' + webhook._id
  });
};

var main = exports.main = function main(ctx) {
  var path = ctx.req._parsedUrl.pathname;

  return '' + _baseUrl2.default + path;
};