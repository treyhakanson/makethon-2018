import express from "express";
import path from "path";

const PORT = 8080;
const app = express();

app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
   res.send(`Server running on: ${PORT}`);
});

const server = app.listen(PORT, () => {
   console.log(`Server started on: ${PORT}`);
});
