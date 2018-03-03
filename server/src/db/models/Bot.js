import mongoose from "mongoose";

const botSchema = new mongoose.Schema({
   botId: Number,
   team: Number,
   directives: [{ priority: Number, name: String }]
});

export default mongoose.model("Bot", botSchema);
