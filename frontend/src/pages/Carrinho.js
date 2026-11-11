import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Carrinho.css';

function Carrinho() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    carregarCarrinho();
  }, []);

  const carregarCarrinho = () => {
    const carrinhoSalvo =
      JSON.parse(localStorage.getItem('ecommerce-cart')) || [];

    setCartItems(carrinhoSalvo);
  };

  const salvarCarrinho = (novoCarrinho) => {
    setCartItems(novoCarrinho);

    localStorage.setItem(
      'ecommerce-cart',
      JSON.stringify(novoCarrinho)
    );
  };

  const removerItem = (id) => {
    const novoCarrinho =
      cartItems.filter(item => item.id !== id);

    salvarCarrinho(novoCarrinho);

    alert('Produto removido do carrinho!');
  };

  const alterarQuantidade = (id, novaQuantidade) => {

    if (novaQuantidade <= 0) {
      removerItem(id);
      return;
    }

    const novoCarrinho =
      cartItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantidade: novaQuantidade
            }
          : item
      );

    salvarCarrinho(novoCarrinho);
  };

  const limparCarrinho = () => {

    localStorage.removeItem('ecommerce-cart');

    setCartItems([]);

    alert('Carrinho esvaziado!');
  };

  const finalizarCompra = () => {

    alert(
      'Compra finalizada com sucesso!'
    );

    localStorage.removeItem(
      'ecommerce-cart'
    );

    navigate('/');
  };

  const total = cartItems.reduce(
    (soma, item) =>
      soma +
      Number(item.preco) *
        Number(item.quantidade || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="carrinho-vazio">

        <h2>
          Seu carrinho está vazio
        </h2>

        <p>
          Adicione produtos para continuar.
        </p>

        <button
          onClick={() =>
            navigate('/produtos')
          }
        >
          Ir para Produtos
        </button>

      </div>
    );
  }

  return (
    <div className="carrinho-container">

      <h1>
        Carrinho de Compras
      </h1>

      <div className="carrinho-items">

        {cartItems.map(item => (

          <div
            key={item.id}
            className="carrinho-item"
          >

            <div className="item-info">

              <h3>
                {item.nome}
              </h3>

              <p>
                Categoria:
                {' '}
                {item.categoria || 'Não informada'}
              </p>

              <p>
                Preço:
                {' '}
                R$
                {' '}
                {Number(item.preco)
                  .toFixed(2)
                  .replace('.', ',')}
              </p>

              <p>
                Subtotal:
                {' '}
                R$
                {' '}
                {(
                  Number(item.preco) *
                  Number(item.quantidade || 1)
                )
                  .toFixed(2)
                  .replace('.', ',')}
              </p>

            </div>

            <div className="item-quantidade">

              <button
                onClick={() =>
                  alterarQuantidade(
                    item.id,
                    (item.quantidade || 1) - 1
                  )
                }
              >
                -
              </button>

              <span>
                {item.quantidade || 1}
              </span>

              <button
                onClick={() =>
                  alterarQuantidade(
                    item.id,
                    (item.quantidade || 1) + 1
                  )
                }
              >
                +
              </button>

            </div>

            <button
              className="btn-remover"
              onClick={() =>
                removerItem(item.id)
              }
            >
              Remover
            </button>

          </div>

        ))}

      </div>

      <div className="carrinho-total">

        <h2>
          Total Geral:
          {' '}
          R$
          {' '}
          {total
            .toFixed(2)
            .replace('.', ',')}
        </h2>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >

          <button
            onClick={() =>
              navigate('/produtos')
            }
          >
            Continuar Comprando
          </button>

          <button
            onClick={limparCarrinho}
          >
            Limpar Carrinho
          </button>

          <button
            className="btn-finalizar"
            onClick={finalizarCompra}
          >
            Finalizar Compra
          </button>

        </div>

      </div>

    </div>
  );
}

export default Carrinho;