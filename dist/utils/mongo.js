'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var db = _mongoose2.default.connection;

_mongoose2.default.Promise = global.Promise;

_mongoose2.default.connect(process.env.DB_HOST);

db.on('error', function (err) {
    console.log(err, 'Mongo could not establish connection');
});

db.once('open', function () {
    console.log('Mongo established connection');
});

process.on('SIGINT', function () {
    console.log('Mongo connection has been terminated');
    process.exit(0);
});

exports.default = db;