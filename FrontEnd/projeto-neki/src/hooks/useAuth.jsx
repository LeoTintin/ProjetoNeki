import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Verifica se há um token no localStorage
      const token = localStorage.getItem("token");
      // Se o token existir, o usuário está autenticado
      setIsAuthenticated(!!token);
    };

    // Checa a autenticação ao carregar o componente
    checkAuth();

    // Adiciona um listener para mudanças no localStorage
    window.addEventListener("storage", checkAuth);

    // Remove o listener quando o componente é desmontado
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return { isAuthenticated };
};
