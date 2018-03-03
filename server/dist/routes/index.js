"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appRoutes = require("./app-routes");

Object.defineProperty(exports, "addAppRoutes", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_appRoutes).default;
  }
});

var _mcuRoutes = require("./mcu-routes");

Object.defineProperty(exports, "addMCURoutes", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mcuRoutes).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }