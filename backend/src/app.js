const express = require("express");
const {
  validarProduto,
  criarProduto
} = require("./services/produtoService");

const app = express();

app.use(express.json());

const produtos = [];

app.get("/", (req, res) => {
  res.json({
    mensagem: "API DevStore funcionando com sucesso!"
  });
});

app.post("/produtos", (req, res) => {
  const { nome, preco } = req.body;

  const validacao = validarProduto(nome, preco);

  if (!validacao.valido) {
    return res.status(400).json({
      mensagem: validacao.mensagem
    });
  }

  const produto = criarProduto(
    produtos.length + 1,
    nome,
    preco
  );

  produtos.push(produto);

  return res.status(201).json({
    mensagem: "Produto cadastrado com sucesso.",
    produto
  });
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

module.exports = app;