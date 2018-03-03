"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var botSchema = new _mongoose2.default.Schema({
   botId: Number,
   team: Number,
   directives: [{ priority: Number, name: String }]
});

exports.default = _mongoose2.default.model("Bot", botSchema);