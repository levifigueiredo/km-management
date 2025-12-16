import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/cse.png'; // ⬅️ IMPORTAR O LOGO

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccess('');
    try {
      await axios.post('/auth/register', { email, password, username });
      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados ou tente novamente.');
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    height: '100vh',
    margin: 0
  };
  const headerStyle = {
    flex: isMobile ? '0 0 25vh' : '0 0 55%',
    maxWidth: isMobile ? '100%' : '55%',
    backgroundColor: '#CC0000', // ⬅️ COR: VERMELHO
    color: '#FFF',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isMobile ? '1rem' : '2rem'
  };
  const formStyle = {
    flex: isMobile ? '1 1 auto' : '0 0 45%',
    maxWidth: isMobile ? '100%' : '45%',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  };
  const wrapper = (field) => ({
    display: 'flex',
    alignItems: 'center',
    background: '#2a2a2a',
    border: `2px solid ${focusField === field ? '#CC0000' : '#3a3a3a'}`, // ⬅️ COR: VERMELHO
    borderRadius: 8,
    padding: '0.75rem 1rem',
    marginBottom: '1.5rem',
  });
  const icon = (field) => ({
    fontSize: 24,
    color: focusField === field ? '#CC0000' : '#FFFFFF', // ⬅️ COR: VERMELHO
    marginRight: 12,
    cursor: 'pointer',
  });
  const input = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: '#FFFFFF',
    fontSize: isMobile ? 16 : 18,
    outline: 'none',
  };

  return (
    <div style={containerStyle}>
      {/* Header Section (Logo Grande e Branco) */}
      <div style={headerStyle}>
          <img 
              src={logo} 
              alt="Logo KART MÔNACO" 
              style={{ 
                  height: isMobile ? '100px' : '200px', 
                  width: 'auto',
                  filter: "brightness(0) invert(1)" 
              }}
          />
      </div>

      {/* Form Section */}
      <div style={formStyle}>
        <div style={{ width: '100%', maxWidth: 450 }}>
          <h2 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 700, color: '#FFF', textAlign: 'left', marginBottom: '0.5rem' }}>
            Crie sua conta
          </h2>
          <p style={{ fontSize: isMobile ? '1rem' : '1.125rem', color: '#a0a0a0', textAlign: 'left', marginBottom: '1.5rem' }}>
            Preencha os campos abaixo para começar
          </p>

          {error && (
            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#dc3545', color: '#fff', borderRadius: 4 }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#28a745', color: '#fff', borderRadius: 4 }}>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div style={wrapper('username')} onFocus={() => setFocusField('username')} onBlur={() => setFocusField(null)}>
                <i className="bi bi-person-fill" style={icon('username')} />
                <input
                  type="text"
                  placeholder="Seu nome de usuário"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  style={input}
                  required
                />
              </div>

              {/* Email Field */}
              <div style={wrapper('email')} onFocus={() => setFocusField('email')} onBlur={() => setFocusField(null)}>
                <i className="bi bi-envelope-fill" style={icon('email')} />
                <input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={input}
                  required
                />
              </div>

              {/* Password Field */}
              <div style={wrapper('password')} onFocus={() => setFocusField('password')} onBlur={() => setFocusField(null)}>
                <i className="bi bi-lock-fill" style={icon('password')} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={input}
                  required
                />
                <i
                  className={showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'}
                  style={{ fontSize: 24, color: focusField === 'password' ? '#CC0000' : '#FFFFFF', marginLeft: 12, cursor: 'pointer' }} 
                  onClick={() => setShowPassword(prev => !prev)}
                />
              </div>

            <button type="submit" style={{ width: '100%', padding: '1rem', backgroundColor: '#CC0000', border: 'none', borderRadius: 8, color: '#FFF', fontSize: isMobile ? 16 : 18, fontWeight: 600, cursor: 'pointer', marginBottom: '1rem' }}> 
              Cadastrar
            </button>

            <div style={{ textAlign: 'left', fontSize: isMobile ? 14 : 16, color: '#a0a0a0' }}> {/* ⬅️ ALINHAMENTO ESQUERDA */}
              Já tem uma conta?{' '}
              <button type="button" style={{ background: 'none', border: 'none', color: '#CC0000', cursor: 'pointer' }} onClick={() => navigate('/login')}> 
                Entrar
              </button>
            </div>
          </form>
        </div>
        <div style={{ width: '100%', maxWidth: 450, marginTop: '1rem', textAlign: 'center', color: '#a0a0a0' }}>
            KM Management by KART MÔNACO
        </div>
      </div>
    </div>
  );
}