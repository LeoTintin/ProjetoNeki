import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const [skills, setSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]); // Habilidades disponíveis para adicionar
  const [showModal, setShowModal] = useState(false);
  const [openModal, setOpenModal] = useState (false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newLevel, setNewLevel] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [userId, setUserId] = useState(null);

  // Função auxiliar para obter o token
  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    const token = getToken();
    console.log("Token:", token); // Verifique se o token está presente
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Verifique a estrutura do token

        const idFromToken = decodedToken.id || decodedToken.userId;
        if (idFromToken) {
          setUserId(idFromToken);

          // Carregar as skills do usuário
          fetch(`http://localhost:8080/usuarios/skills/${idFromToken}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setSkills(data);
              console.log(data);
            })
            .catch((error) =>
              console.error("Erro ao carregar skills do usuário:", error)
            );

          // Carregar as habilidades disponíveis para adicionar
          fetch("http://localhost:8080/skills", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => setAvailableSkills(data))
            .catch((error) =>
              console.error("Erro ao carregar habilidades disponíveis:", error)
            );
        } else {
          console.error("ID do usuário não encontrado no token");
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleImageClick = (skill) => {
    setSelectedSkill(skill);
    setOpenModal(true);
  };

  const handleLevelClick = (id, currentLevel) => {  
    setEditingSkillId(id);
    setNewLevel(currentLevel);
    setShowLevelModal(true);
  };

  const handleLevelChange = (level) => {
    fetch(`http://localhost:8080/usuarios/skills/${userId}/${editingSkillId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ level }),
    })
      .then((response) => response.json())
      .then((updatedSkill) => {
        setSkills(
          skills.map((skill) =>
            skill.id === editingSkillId ? updatedSkill : skill
          )
        );
        setShowLevelModal(false);
        setEditingSkillId(null);
      })
      .catch((error) => console.error("Erro ao atualizar skill:", error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSkill(null);
  };

  const handleDeleteSkill = (id) => {
    fetch(`http://localhost:8080/usuarios/skills/${userId}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(() => {
        setSkills(skills.filter((skill) => skill.id !== id));
      })
      .catch((error) => console.error("Erro ao excluir skill:", error));
  };

  const handleAddSkill = () => {
    setShowModal(true);
  };

  const handleSaveSkill = () => {
    fetch("http://localhost:8080/usuarios/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        usuarioId: userId,
        skillId: selectedOption,
        level: "INICIANTE", // Você pode ajustar isso conforme a lógica desejada
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSkills([...skills, data]);
        setShowModal(false);
      })
      .catch((error) => console.error("Erro ao salvar skill:", error));
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Skills</h1>
        <div className="skillset">
          {skills.map((skill) => (
            <div key={skill.id} className="skill">
              <img
                src={skill.imagemUrl}
                alt={skill.nome}
                onClick={() => handleImageClick(skill)}
              />
              <h2>{skill.nome}</h2>
              <button
                className="button2"
                onClick={() => handleLevelClick(skill.id, skill.level)}
              >
                {skill.level}
              </button>
              <button
                className="button2"
                onClick={() => handleDeleteSkill(skill.id)}
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button className="button2" onClick={handleAddSkill}>
          Adicionar Skill
        </button>
       
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h1>Adicionar Skill</h1>
              <select
                className="selection"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <option value="" disabled>
                  Escolha sua habilidade
                </option>
                {availableSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.nome}
                  </option>
                ))}
              </select>
              <button className="button2" onClick={handleSaveSkill}>
                Salvar
              </button>
              <button className="button2" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {selectedSkill && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedSkill.nome}</h2>
              <p>{selectedSkill.descricao}</p>
              <button className="button2" onClick={handleCloseModal}>Fechar</button>
            </div>
          </div>
        )}

        {showLevelModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Editar Nível</h2>
              <button
                className="button2"
                onClick={() => handleLevelChange("INICIANTE")}
              >
                Iniciante
              </button>
              <button
                className="button2"
                onClick={() => handleLevelChange("INTERMEDIARIO")}
              >
                Intermediário
              </button>
              <button
                className="button2"
                onClick={() => handleLevelChange("AVANCADO")}
              >
                Avançado
              </button>
              <button
                className="button2"
                onClick={() => setShowLevelModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <button className="button">
          <a href="/login" className="Link">
            Log-Out
          </a>
        </button>

        <div className="register-link">
          <p>Deseja criar uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>
    </div>
  );
};
