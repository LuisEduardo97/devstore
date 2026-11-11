const express = require("express");

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

  if (!nome || preco === undefined) {
    return res.status(400).json({
      mensagem: "Nome e preço são obrigatórios."
    });
  }

  if (typeof preco !== "number" || preco <= 0) {
    return res.status(400).json({
      mensagem: "O preço deve ser um número maior que zero."
    });
  }

  const produto = {
    id: produtos.length + 1,
    nome,
    preco
  };

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