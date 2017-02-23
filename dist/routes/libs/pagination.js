'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _baseUrl = require('./baseUrl');

var _baseUrl2 = _interopRequireDefault(_baseUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (array, ctx, limit, offset) {
  var url = ctx.url;
  var path = ctx.req._parsedUrl.pathname;

  return [].concat((0, _toConsumableArray3.default)(array), [{
    self: '' + _baseUrl2.default + url,
    next: array.length >= limit ? '' + _baseUrl2.default + path + '?offset=' + (offset + 1) + '&limit=' + limit : undefined,
    prev: offset !== 0 ? '' + _baseUrl2.default + path + '?offset=' + (offset - 1) + '&limit=' + limit : undefined
  }]);
};