const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Hospital", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new Hospital", async () => {
    const response = await request(app)
      .post("/hospitais")
      .send({
        name: "Nossa Senhora das Neves",
        email: "nossasenhoraneves@hospital.com",
        whatsapp: "8332245232",
        city: "João Pessoa",
        uf: "PB"
      });

    console.log(response.body);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
  });
});
