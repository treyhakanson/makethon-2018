"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _db = require("./db");

var _db2 = _interopRequireDefault(_db);

var _routes = require("./routes");

var routes = _interopRequireWildcard(_routes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 8080;
var app = (0, _express2.default)();

(0, _db2.default)();

app.use(_bodyParser2.default.json());

app.set("views", _path2.default.resolve(__dirname, "../views"));
app.set("view engine", "ejs");

routes.addMCURoutes(app);
routes.addAppRoutes(app);

app.get("/", function (req, res) {
   res.send("Server running on: " + PORT);
});

var server = app.listen(PORT, function () {
   console.log("Server started on: " + PORT);
});