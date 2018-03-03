"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (app) {
   app.get("/ping", ping);
};

function ping(req, res) {
   res.send("Connection successful.");
}