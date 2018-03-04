import { Bot } from "../db/models";

function updateDirectives(req, res) {
   const { botId } = req.params;
   const { directives } = req.body;

   Bot.findOneAndUpdate({ botId }, { botId, directives }, (err, bot) => {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }
      res.json({ success: true, directives });
   });
}

function getDirectives(req, res) {
   const { botId } = req.params;

   Bot.findOne({ botId }, (err, bot) => {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }
      res.json({ success: true, bot });
   });
}

function getBots(req, res) {
   const { teamId, botId } = req.params;

   let search = { team: teamId };
   if (botId) {
      search[botId] = botId;
   }

   Bot.find(search, (err, bots) => {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }

      res.json({ success: true, bots });
   });
}

export default function(app) {
   app.get("/bot/:teamId/:botId?", getBots);
   app.post("/directives/:botId", updateDirectives);
   app.get("/directives/:botId", getDirectives);
}
