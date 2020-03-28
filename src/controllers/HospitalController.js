const crypto = require("crypto");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const hospitais = await connection("hospitais").select("*");

    return res.json(hospitais);
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString("HEX");

    await connection("hospitais").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id });
  }
};
