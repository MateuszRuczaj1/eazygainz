const express = require("express");
const app = express();

app.get("/home", (req, res) => {
  res.send("Hello");
});

app.listen(3030, (req, res) => {
  console.log("Backend listening at port 3030");
});
