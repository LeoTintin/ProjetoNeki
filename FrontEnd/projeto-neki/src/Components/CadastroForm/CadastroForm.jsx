import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export const CadastroForm = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        confirmPassword: ''
    });
    const [open, setOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleErrorOpen = () => setErrorOpen(true);
    const handleErrorClose = () => setErrorOpen(false);

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        });
    };

    const handleCheckboxChange = (event) => {
        setShowPassword(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            handleErrorOpen();
        } else {
            await handleForm();
        }
    };

    const handleForm = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: formData.login,
                    password: formData.password,
                    role: 'ADMIN'  // ou outro valor se necessário
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const json = response.headers.get('Content-Length') > 0 ? await response.json() : null;
            console.log('Cadastro realizado:', json);
            handleOpen();
        } catch (err) {
            console.error('Erro ao realizar o cadastro:', err);
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder='Nome de usuário' 
                        required 
                        value={formData.login} 
                        onChange={(e) => handleFormEdit(e, 'login')} 
                    />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Senha'
                        required
                        value={formData.password}
                        onChange={(e) => handleFormEdit(e, 'password')}
                    />
                    <FaLock className='icon' />
                </div>
                <div className="input-box">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Insira a senha novamente'
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => handleFormEdit(e, 'confirmPassword')}
                    />
                    <FaLock className='icon' />
                </div>
                <div className="remember">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={handleCheckboxChange}
                        />
                        Visualizar senha
                    </label>
                </div>
                <Button variant="contained" type="submit"><Link className='Link' to="/home">ENTRAR</Link></Button>

                {/* Modal para mensagem de sucesso */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            borderRadius: 7,
                            p: 4,
                        }}
                    >
                        <Typography id="modal-description" sx={{ textAlign: 'center' }}>
                            Cadastro realizado!
                        </Typography>
                    </Box>
                </Modal>

                {/* Modal para mensagem de erro */}
                <Modal
                    open={errorOpen}
                    onClose={handleErrorClose}
                    aria-labelledby="error-modal-title"
                    aria-describedby="error-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'background.paper',
                            border: '2px solid #f00',
                            boxShadow: 24,
                            borderRadius: 7,
                            p: 4,
                        }}
                    >
                        <Typography id="error-modal-description" sx={{ textAlign: 'center', color: 'red' }}>
                            As senhas não correspondem. Por favor, verifique e tente novamente.
                        </Typography>
                    </Box>
                </Modal>

                <div className="register-link">
                    <p>Já possui conta? <Link to="/login">Logar</Link></p>
                </div>
            </form>
        </div>
    );
};
