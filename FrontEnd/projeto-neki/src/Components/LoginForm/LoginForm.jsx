import React, { useState } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='wrapper'>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder='Nome de usuario' required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Senha'
            required
          />
          <FaLock className='icon' />
        </div>
        <div className="remember">
          <label><input type="checkbox" /> Lembre de mim</label>
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