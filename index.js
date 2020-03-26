const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send.json({
    teste: "blabalba",
    alsi: "fasds"
  });
});

app.listen(4001);
