import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {

  const navigate = useNavigate();

  return (

    <div className="home-container">

      <div className="home-card">

        <h1>Sistema de Gerenciamento de Produtos</h1>

        <p>
          Escolha uma opção abaixo
        </p>

        <div className="buttons-container">

          <button
            className="btn-home"
            onClick={() => navigate('/cadastro')}
          >
            Cadastrar Produtos
          </button>

          <button
            className="btn-home"
            onClick={() => navigate('/produtos')}
          >
            Visualizar Produtos
          </button>

          <button
            className="btn-home"
            onClick={() => navigate('/carrinho')}
          >
            Carrinho de Compras
          </button>

        </div>

      </div>

    </div>

  );

}

export default Home;