import React, { useState } from 'react';

export const Home = () => {
  const [skills, setSkills] = useState([
    // {
    //   id: 1,
    //   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s',
    //   name: 'React',
    //   level: 'Iniciante',
    //   description: 'O React é uma biblioteca front-end JavaScript de código aberto com foco em criar interfaces de usuário em páginas web.',
    // },
    // {
    //   id: 2,
    //   imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
    //   name: 'Java',
    //   level: 'Intermediário',
    //   description: 'JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma',
    // },
    // {
    //   id: 3,
    //   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUmnFYeOmmAlNV9_ZTu5cYgS2L55Q1pt9QyA&s',
    //   name: 'Postgres',
    //   level: 'Avançado',
    //   description: 'PostgreSQL é um sistema gerenciador de banco de dados objeto relacional, desenvolvido como projeto de código aberto.',
    // }
    // // Adicione mais skills conforme necessário
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [newLevel, setNewLevel] = useState('');
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const handleImageClick = (skill) => {
    setSelectedSkill(skill);
    setShowModal(true);
  };

  const handleLevelClick = (id, currentLevel) => {
    setEditingSkillId(id);
    setNewLevel(currentLevel);
    setShowLevelModal(true);
  };

  const handleLevelChange = (level) => {
    setSkills(
      skills.map((skill) =>
        skill.id === editingSkillId ? { ...skill, level: level } : skill
      )
    );
    setShowLevelModal(false);
    setEditingSkillId(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSkill(null);
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleAddSkill = () => {
    setShowModal(true);
  };

  const handleSaveSkill = (newSkill) => {
    setSkills([...skills, newSkill]);
    setShowModal(false);
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
                src={skill.imageUrl}
                alt={skill.name}
                onClick={() => handleImageClick(skill)}
               />
              <h2>{skill.name}</h2>
              <button className='button2'  onClick={() => handleLevelClick(skill.id, skill.level)}>
                Level: {skill.level}
              </button>
              <button className='button2'  onClick={() => handleDeleteSkill(skill.id)}>
                Excluir
              </button>
            </div>
          ))}
        </div>

        <button className='button2'  onClick={handleAddSkill}>Adicionar Skill</button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h1>Adicionar Skill</h1>
              <select className='selection' value={selectedOption} onChange={handleOptionChange}>
    <option value="" disabled>Escolha sua habilidade</option>
    <option value="skill1">React</option>
    <option value="skill2">Java</option>
    <option value="skill3">Postgres</option>
  </select>
              <button className='button2'  onClick={handleSaveSkill}>Salvar</button>
              <button className='button2'  onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        )}

        {selectedSkill && (
          <div className="modal">
            <div className="modal-content">
              <h2>{selectedSkill.name}</h2>
              <p>{selectedSkill.description}</p>
              <button onClick={handleCloseModal}>Fechar</button>
            </div>
          </div>
        )}

        {showLevelModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Editar Nível</h2>
              <button className='button2' onClick={() => handleLevelChange('Iniciante')}>Iniciante</button>
              <button className='button2'  onClick={() => handleLevelChange('Intermediário')}>Intermediário</button>
              <button className='button2'  onClick={() => handleLevelChange('Avançado')}>Avançado</button>
              <button className='button2'  onClick={() => setShowLevelModal(false)}>Cancelar</button>
            </div>
          </div>
        )}

        <button className='button'>
          <a href="/login" className="Link">Log-Out</a>
        </button>
      </div>
    </div>
  );
};
