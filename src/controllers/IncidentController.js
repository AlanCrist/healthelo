const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("incidents").count();

    const incidents = await connection("incidents")
      .join("hospitais", "hospitais.id", "=", "incidents.hospital_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "incidents.*",
        "hospitais.name",
        "hospitais.email",
        "hospitais.whatsapp",
        "hospitais.city",
        "hospitais.uf"
      ]);

    res.header("X-Total-Count", count["count(*)"]);

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const hospital_id = req.headers.authorization;

    const [id] = await connection("incidents").insert({
      title,
      description,
      value,
      hospital_id
    });

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const hospital_id = req.headers.authorization;

    const incident = await connection("incidents")
      .where("id", id)
      .select("hospital_id")
      .first();

    if (incident.hospital_id !== hospital_id) {
      return res.status(401).json({ error: "Operation not permitted." });
    }

    await connection("incidents")
      .where("id", id)
      .delete();

    return res.status(204).send();
  }
};
