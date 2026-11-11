import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastro.css';

function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    quantidade: '',
    preco: '',
    descricao: '',
    imagem: ''
  });

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    if (erros[name]) {
      setErros({
        ...erros,
        [name]: ''
      });
    }
  };

  const handleImagem = (e) => {
    const arquivo = e.target.files[0];

    if (!arquivo) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        imagem: reader.result
      });
    };

    reader.readAsDataURL(arquivo);
  };

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Informe o nome do produto';
    }

    if (!formData.categoria.trim()) {
      novosErros.categoria = 'Informe a categoria';
    }

    if (!formData.quantidade) {
      novosErros.quantidade = 'Informe a quantidade';
    }

    if (!formData.preco) {
      novosErros.preco = 'Informe o preço';
    }

    if (!formData.descricao.trim()) {
      novosErros.descricao = 'Informe a descrição';
    }

    if (!formData.imagem) {
      novosErros.imagem = 'Selecione uma imagem';
    }

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validarFormulario()) {

      const produtos =
        JSON.parse(localStorage.getItem('produtos')) || [];

      produtos.push({
        id: Date.now(),
        ...formData
      });

      localStorage.setItem(
        'produtos',
        JSON.stringify(produtos)
      );

      alert('Produto cadastrado com sucesso!');

      setFormData({
        nome: '',
        categoria: '',
        quantidade: '',
        preco: '',
        descricao: '',
        imagem: ''
      });

      navigate('/produtos');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">

        <h1>Cadastro de Produtos</h1>

        <p className="subtitulo">
          Preencha os dados do produto
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nome do Produto *</label>

            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Notebook Dell"
              className={erros.nome ? 'input-error' : ''}
            />

            {erros.nome && (
              <span className="erro">
                {erros.nome}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Categoria *</label>

            <input
              type="text"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              placeholder="Informática"
              className={erros.categoria ? 'input-error' : ''}
            />

            {erros.categoria && (
              <span className="erro">
                {erros.categoria}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Quantidade *</label>

            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              placeholder="10"
              className={erros.quantidade ? 'input-error' : ''}
            />

            {erros.quantidade && (
              <span className="erro">
                {erros.quantidade}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Preço *</label>

            <input
              type="number"
              step="0.01"
              name="preco"
              value={formData.preco}
              onChange={handleChange}
              placeholder="3500.00"
              className={erros.preco ? 'input-error' : ''}
            />

            {erros.preco && (
              <span className="erro">
                {erros.preco}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Descrição *</label>

            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Descreva o produto..."
              rows="4"
              className={erros.descricao ? 'input-error' : ''}
            />

            {erros.descricao && (
              <span className="erro">
                {erros.descricao}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Foto do Produto *</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImagem}
            />

            {erros.imagem && (
              <span className="erro">
                {erros.imagem}
              </span>
            )}

            {formData.imagem && (
              <img
                src={formData.imagem}
                alt="Preview"
                className="preview-imagem"
              />
            )}
          </div>

          <button
            type="submit"
            className="btn-cadastrar"
          >
            Cadastrar Produto
          </button>

          <button
            type="button"
            className="btn-voltar"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>

        </form>

      </div>
    </div>
  );
}

export default Cadastro;