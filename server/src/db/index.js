import mongoose from "mongoose";

export default function() {
   mongoose.connect("mongodb://127.0.0.1:27017/makethon-2018");
}
