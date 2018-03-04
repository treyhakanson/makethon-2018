import { Bot } from "../db/models";

function ping(req, res) {
   res.send("Connection successful.");
}

function getBot(req, res) {
   const { teamId, botId } = req.params;

   Bot.find({ team: teamId, botId }, (err, [bot]) => {
      if (err) {
         res.json({ success: false, error: err });
         return;
      }

      let data = {};
      data.success = true;
      bot.directives.forEach(x => {
         let k = `priority${x.priority}`;
         data[k] = x.name;
      });
      res.json(data);
   });
}

export default function(app) {
   app.get("/mcu/ping", ping);
   app.get("/mcu/bot/:teamId/:botId", getBot);
}
