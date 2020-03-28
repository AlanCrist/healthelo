const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const hospital_id = req.headers.authorization;

    const incidents = await connection("incidents")
      .where("hospital_id", hospital_id)
      .select("*");

    return res.json(incidents);
  }
};
