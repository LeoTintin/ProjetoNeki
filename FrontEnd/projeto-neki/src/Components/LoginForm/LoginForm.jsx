import React, { useState, useEffect } from 'react';
import './Styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLogin = localStorage.getItem('login');
    const savedPassword = localStorage.getItem('password');

    if (savedLogin && savedPassword) {
      setLogin(savedLogin);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
      });

      if (!response.ok) {
        throw new Error('Nome de usuário ou senha incorretos');
      }

      const data = await response.json();
      console.log('Autenticação bem-sucedida:', data);

      localStorage.setItem('token', data.token);

      if (rememberMe) {
        localStorage.setItem('login', login);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
      }

      navigate('/home');
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErrorMessage(error.message);
      setShowErrorModal(true);
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };

  const handleModalClick = (e) => {
    // Fecha o modal se o clique for fora do conteúdo do modal
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='Nome de usuário'
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Senha'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>
        <div className="remember">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Lembre de mim
          </label>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={handleShowPasswordChange}
            />
            Mostrar Senha
          </label>
        </div>
        <button className='button' type='submit'>ENTRAR</button>
       
      </form>

      {showErrorModal && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <h2>Erro de Autenticação</h2>
            <p>{errorMessage}</p>
            <button className='button2' onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};
