'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _events = require('events');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _WebhookSchema = require('../../models/WebhookSchema');

var _WebhookSchema2 = _interopRequireDefault(_WebhookSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emitter = new _events.EventEmitter();

emitter.on('post', function (data) {
  sendToSubscribers('post', data);
});

emitter.on('comment', function (data) {
  sendToSubscribers('comment', data);
});

emitter.on('user', function (data) {
  sendToSubscribers('user', data);
});

var sendToSubscribers = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(emit, data) {
    var webhooks, eventSubscribers;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _WebhookSchema2.default.find({}, 'endpoint scope secret', { lean: true });

          case 3:
            webhooks = _context2.sent;
            eventSubscribers = webhooks.filter(function (webhook) {
              return webhook.scope.includes(emit) || webhook.scope.includes('push');
            });
            _context2.next = 7;
            return eventSubscribers.forEach(function () {
              var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(subscriber) {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _requestPromise2.default)({
                          uri: subscriber.endpoint,
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: {
                            data: data,
                            secret: subscriber.secret
                          },
                          json: true
                        });

                      case 2:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 7:
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);

            console.log('Could not post hook');

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function sendToSubscribers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = emitter;