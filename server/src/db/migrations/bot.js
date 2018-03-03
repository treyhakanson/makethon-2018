import { Bot } from "../models";
import init from "../index";

init();

async function botMigration() {
   await Bot.remove({});

   let bot;
   for (let i = 0; i < 6; i++) {
      bot = new Bot({
         team: i < 3 ? 0 : 1,
         botId: i,
         directives: []
      });

      await bot.save(err => {
         if (err) {
            console.log(`Bot ${i} creation failed.`);
            return;
         }
         console.log(`Bot ${i} created successfully.`);
      });
   }
}

console.log("Running");

botMigration();
