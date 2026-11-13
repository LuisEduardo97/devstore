function validarProduto(nome, preco) {
  if (!nome || preco === undefined) {
    return {
      valido: false,
      mensagem: "Nome e preço são obrigatórios."
    };
  }

  if (typeof preco !== "number" || preco <= 0) {
    return {
      valido: false,
      mensagem: "O preço deve ser um número maior que zero."
    };
  }

  return {
    valido: true
  };
}

function criarProduto(id, nome, preco) {
  return {
    id,
    nome,
    preco
  };
}

module.exports = {
  validarProduto,
  criarProduto
};