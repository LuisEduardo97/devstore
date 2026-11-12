const {
  validarProduto,
  criarProduto
} = require("../../src/services/produtoService");

describe("produtoService - testes unitários", () => {
  test("deve validar um produto com nome e preço válidos", () => {
    const resultado = validarProduto("Notebook", 4500);

    expect(resultado).toEqual({
      valido: true
    });
  });

  test("deve rejeitar produto com preço inválido", () => {
    const resultado = validarProduto("Notebook", -10);

    expect(resultado).toEqual({
      valido: false,
      mensagem: "O preço deve ser um número maior que zero."
    });
  });
});