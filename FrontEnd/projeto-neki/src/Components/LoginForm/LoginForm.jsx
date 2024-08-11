import React, { useState, useEffect } from 'react';
import './Styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar as credenciais armazenadas no localStorage
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Autenticação bem-sucedida:', data);

      // Armazenar o token no localStorage, caso receba um token na resposta
      localStorage.setItem('token', data.token);

      // Verificar se o checkbox "Lembre de mim" está marcado
      if (rememberMe) {
        localStorage.setItem('login', login);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('login');
        localStorage.removeItem('password');
      }

      // Redirecionar para a página home após o login
      navigate('/home');
    } catch (error) {
      console.error('Erro ao autenticar:', error);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder='Nome de usuario'
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
        <button type='submit'>ENTRAR</button>
        <div className="register-link">
          <p>Não possui conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </form>
    </div>
  );
};
