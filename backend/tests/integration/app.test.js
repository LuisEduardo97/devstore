const request = require("supertest");
const app = require("../../src/app");

describe("API DevStore - testes de integração", () => {
  test("GET / deve retornar status 200 e mensagem da API", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      mensagem: "API DevStore funcionando com sucesso!"
    });
  });

  test("POST /produtos deve cadastrar um produto válido", async () => {
    const response = await request(app)
      .post("/produtos")
      .send({
        nome: "Notebook Gamer",
        preco: 4500
      });

    expect(response.status).toBe(201);
    expect(response.body.produto).toMatchObject({
      nome: "Notebook Gamer",
      preco: 4500
    });
  });

  test("GET /produtos deve retornar uma lista de produtos", async () => {
    const response = await request(app).get("/produtos");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});