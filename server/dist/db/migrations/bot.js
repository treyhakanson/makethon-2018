"use strict";

var botMigration = function () {
   var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      var bot, _loop, i;

      return regeneratorRuntime.wrap(function _callee$(_context2) {
         while (1) {
            switch (_context2.prev = _context2.next) {
               case 0:
                  _context2.next = 2;
                  return _models.Bot.remove({});

               case 2:
                  bot = void 0;
                  _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                     return regeneratorRuntime.wrap(function _loop$(_context) {
                        while (1) {
                           switch (_context.prev = _context.next) {
                              case 0:
                                 bot = new _models.Bot({
                                    team: i < 3 ? 0 : 1,
                                    botId: i,
                                    directives: []
                                 });

                                 _context.next = 3;
                                 return bot.save(function (err) {
                                    if (err) {
                                       console.log("Bot " + i + " creation failed.");
                                       return;
                                    }
                                    console.log("Bot " + i + " created successfully.");
                                 });

                              case 3:
                              case "end":
                                 return _context.stop();
                           }
                        }
                     }, _loop, _this);
                  });
                  i = 0;

               case 5:
                  if (!(i < 6)) {
                     _context2.next = 10;
                     break;
                  }

                  return _context2.delegateYield(_loop(i), "t0", 7);

               case 7:
                  i++;
                  _context2.next = 5;
                  break;

               case 10:
               case "end":
                  return _context2.stop();
            }
         }
      }, _callee, this);
   }));

   return function botMigration() {
      return _ref.apply(this, arguments);
   };
}();

var _models = require("../models");

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

(0, _index2.default)();

console.log("Running");

botMigration();