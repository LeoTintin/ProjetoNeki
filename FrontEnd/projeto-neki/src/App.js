import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { CadastroForm } from './Components/CadastroForm/CadastroForm';
import { LoginForm } from './Components/LoginForm/LoginForm';
import { Home } from './Components/Home/Home';
import { useAuth } from './hooks/useAuth'; // Importe o hook useAuth

function App() {
  const { isAuthenticated } = useAuth(); // Use o hook useAuth para verificar a autenticação

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        {/* Proteja a rota de cadastro, permitindo acesso apenas se o usuário estiver autenticado */}
        <Route
          path="/cadastro"
          element={isAuthenticated ? <CadastroForm /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
