import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = (e) => {

    e.preventDefault();

    if (
      usuario === 'admin' &&
      senha === '123456'
    ) {

      navigate('/home');

    } else {

      alert('Usuário ou senha inválidos!');

    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Bem-vindo ao Meu E-Commerce</h1>

        <p>Área Administrativa</p>

        <form onSubmit={fazerLogin}>

          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;