import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Produtos from './pages/Produtos';
import Carrinho from './pages/Carrinho';

import './App.css';

function App() {

  return (
    <Router>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        <Route
          path="/produtos"
          element={<Produtos />}
        />

        <Route
          path="/carrinho"
          element={<Carrinho />}
        />

      </Routes>

    </Router>
  );
}

export default App;