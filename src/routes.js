const express = require("express");
const crypto = require("crypto");
const connection = require("./database/connection");

const routes = express.Router();

routes.get("/hospitais", async (req, res) => {
  const hospitais = await connection("hospitais").select("*");

  return res.json(hospitais);
})

routes.post("/hospitais", (req, res) => {
  const { name, email, whatsapp, city, uf } = request.body;

  const id = crypto.randomBytes(4).toString("HEX");

  connection("hospitais").insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  });

  return res.json({ id });
});

module.exports = routes;
