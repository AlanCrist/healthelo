const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const hospital = await connection("hospitais")
      .where("id", id)
      .select("name")
      .first();

    if (!hospital) {
      return res.status(400).json({ error: "No Hospital found with this ID" });
    }

    return res.json(hospital);
  }
};
