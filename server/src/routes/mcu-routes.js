function ping(req, res) {
   res.send("Connection successful.");
}

export default function(app) {
   app.get("/ping", ping);
}
