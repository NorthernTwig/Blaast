'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

exports.default = _mongoose2.default.model('CommentSchema', _mongoose2.default.Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'UserSchema',
      required: true
    },
    name: {
      type: String,
      ref: 'UserSchema',
      required: true
    }
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'PostSchema',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
}));