import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Produtos.css';

function Produtos() {

  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const [editando, setEditando] = useState(null);

  const [formEdit, setFormEdit] = useState({
    nome: '',
    categoria: '',
    quantidade: '',
    preco: '',
    descricao: ''
  });

  useEffect(() => {

    const produtosSalvos =
      JSON.parse(localStorage.getItem('produtos')) || [];

    setProdutos(produtosSalvos);

    const carrinhoSalvo =
      JSON.parse(localStorage.getItem('ecommerce-cart')) || [];

    setCarrinho(carrinhoSalvo);

  }, []);

  const adicionarAoCarrinho = (produto) => {

    const carrinhoAtual =
      JSON.parse(localStorage.getItem('ecommerce-cart')) || [];

    const produtoExistente =
      carrinhoAtual.find(item => item.id === produto.id);

    let novoCarrinho;

    if (produtoExistente) {

      novoCarrinho = carrinhoAtual.map(item =>
        item.id === produto.id
          ? {
              ...item,
              quantidade: (item.quantidade || 1) + 1
            }
          : item
      );

    } else {

      novoCarrinho = [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade: 1
        }
      ];

    }

    localStorage.setItem(
      'ecommerce-cart',
      JSON.stringify(novoCarrinho)
    );

    setCarrinho(novoCarrinho);

    alert(`${produto.nome} adicionado ao carrinho!`);
  };

  const excluirProduto = (id) => {

    if (!window.confirm(
      'Deseja realmente excluir este produto?'
    )) {
      return;
    }

    const novosProdutos =
      produtos.filter(produto => produto.id !== id);

    setProdutos(novosProdutos);

    localStorage.setItem(
      'produtos',
      JSON.stringify(novosProdutos)
    );

    alert('Produto removido com sucesso!');
  };

  const editarProduto = (produto) => {

    setEditando(produto.id);

    setFormEdit({
      nome: produto.nome,
      categoria: produto.categoria,
      quantidade: produto.quantidade,
      preco: produto.preco,
      descricao: produto.descricao
    });

  };

  const salvarEdicao = (id) => {

    const produtosAtualizados =
      produtos.map(produto =>

        produto.id === id
          ? {
              ...produto,
              ...formEdit
            }
          : produto

      );

    setProdutos(produtosAtualizados);

    localStorage.setItem(
      'produtos',
      JSON.stringify(produtosAtualizados)
    );

    setEditando(null);

    alert('Produto atualizado com sucesso!');
  };

  const totalCarrinho =
    carrinho.reduce(
      (soma, item) =>
        soma +
        Number(item.preco) *
        Number(item.quantidade || 1),
      0
    );

  return (
    <div className="produtos-container">

      <header className="produtos-header">
        <div className="carrinho-info">
  <p>Itens no Carrinho: {carrinho.length}</p>

  <p>
    Total: R$
    {totalCarrinho.toFixed(2).replace('.', ',')}
  </p>
</div>

        <h1>Lista de Produtos</h1>

        <div className="header-buttons">

          <button
            className="btn-cadastrar"
            onClick={() => navigate('/cadastro')}
          >
            + Novo Produto
          </button>

          <button
            className="btn-carrinho"
            onClick={() => navigate('/carrinho')}
          >
            🛒 Carrinho ({carrinho.length})
          </button>

          <button
            className="btn-home"
            onClick={() => navigate('/home')}
          >
            Home
          </button>

        </div>

      </header>

      {produtos.length === 0 ? (

        <div className="sem-produtos">

          <h2>Nenhum produto cadastrado</h2>

          <button
            onClick={() => navigate('/cadastro')}
          >
            Cadastrar Produto
          </button>

        </div>

      ) : (

        <div className="produtos-grid">

          {produtos.map(produto => (

            <div
              key={produto.id}
              className="produto-card"
            >

              {produto.imagem && (

                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="produto-imagem"
                />

              )}

              <h3>{produto.nome}</h3>

              <p>
                <strong>Categoria:</strong>
                {' '}
                {produto.categoria}
              </p>

              <p>
                <strong>Quantidade:</strong>
                {' '}
                {produto.quantidade}
              </p>

              <p>
                <strong>Descrição:</strong>
                {' '}
                {produto.descricao}
              </p>

              <p className="produto-preco">
                R$ {Number(produto.preco)
                  .toFixed(2)
                  .replace('.', ',')}
              </p>

              {editando === produto.id && (

                <div className="editar-box">

                  <input
                    type="text"
                    value={formEdit.nome}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        nome: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    value={formEdit.categoria}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        categoria: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    value={formEdit.quantidade}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        quantidade: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    value={formEdit.preco}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        preco: e.target.value
                      })
                    }
                  />

                  <textarea
                    value={formEdit.descricao}
                    onChange={(e) =>
                      setFormEdit({
                        ...formEdit,
                        descricao: e.target.value
                      })
                    }
                  />

                  <button
                    className="btn-salvar"
                    onClick={() =>
                      salvarEdicao(produto.id)
                    }
                  >
                    Salvar Alterações
                  </button>

                </div>

              )}

              <div className="produto-botoes">

                <button
                  className="btn-comprar"
                  onClick={() =>
                    adicionarAoCarrinho(produto)
                  }
                >
                  Adicionar ao Carrinho
                </button>

                <button
                  className="btn-editar"
                  onClick={() =>
                    editarProduto(produto)
                  }
                >
                  Editar
                </button>

                <button
                  className="btn-excluir"
                  onClick={() =>
                    excluirProduto(produto.id)
                  }
                >
                  Excluir
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Produtos;