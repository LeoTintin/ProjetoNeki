import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CadastroForm } from './Components/CadastroForm/CadastroForm';
import { LoginForm } from './Components/LoginForm/LoginForm';
import { Home } from './Components/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<CadastroForm />} />
      </Routes>
    </Router>
  );
}

export default App;
