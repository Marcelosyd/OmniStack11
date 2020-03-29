import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: { Authorization: ongId }
      });
      history.push('/perfil');
    } catch (err) {
      alert('Erro no cadastro.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente.</p>

          <Link className="back-link" to="/perfil">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titulo do caso"
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Descrição"
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="value"
            id="value"
            placeholder="Valor em reais"
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
