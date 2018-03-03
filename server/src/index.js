import express from "express";
import path from "path";
import bodyParser from "body-parser";
import init from "./db";

import * as routes from "./routes";

const PORT = 8080;
const app = express();

init();

app.use(bodyParser.json());

app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "ejs");

routes.addMCURoutes(app);
routes.addAppRoutes(app);

app.get("/", (req, res) => {
   res.send(`Server running on: ${PORT}`);
});

const server = app.listen(PORT, () => {
   console.log(`Server started on: ${PORT}`);
});
