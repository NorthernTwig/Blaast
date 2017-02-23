'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

exports.default = _mongoose2.default.model('WebhookSchema', _mongoose2.default.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'UserSchema',
    required: true
  },
  endpoint: {
    type: String
  },
  scope: {
    type: Array,
    default: ['push']
  },
  secret: {
    type: String
  }
}));