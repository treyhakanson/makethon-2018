"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (app) {
   app.get("/bot/:teamId/:botId", getBots);
   app.post("/directives/:botId", updateDirectives);
   app.get("/directives/:botId", getDirectives);
};

var _models = require("../db/models");

function updateDirectives(req, res) {
   var botId = req.params.botId;

   var directives = JSON.parse(req.body.directives);

   _models.Bot.findOneAndUpdate({ botId: botId }, { botId: botId, directives: directives }, function (err, bot) {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }
      res.json({ success: true, directives: directives });
   });
}

function getDirectives(req, res) {
   var botId = req.params.botId;


   _models.Bot.findOne({ botId: botId }, function (err, bot) {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }
      res.json({ success: true, bot: bot });
   });
}

function getBots(req, res) {
   var _req$params = req.params,
       teamId = _req$params.teamId,
       botId = _req$params.botId;


   var search = { teamId: teamId };
   if (botId) {
      search[botId] = botId;
   }

   _models.Bot.find(search, function (err, bots) {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }

      res.json({ success: true, bots: bots });
   });
}