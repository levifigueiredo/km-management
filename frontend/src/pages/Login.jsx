import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../assets/cse.png'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      
      login(data.token); 
      navigate('/home');
    } catch {
      setError('Email ou senha inválidos');
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
    backgroundColor: '#CC0000', 
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
    border: `2px solid ${focusField === field ? '#CC0000' : '#3a3a3a'}`, 
    borderRadius: 8,
    padding: '0.75rem 1rem',
    marginBottom: '1.5rem',
  });
  const icon = (field) => ({
    fontSize: 24,
    color: focusField === field ? '#CC0000' : '#FFFFFF', 
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
      {/* Header Section (Apenas Logo em Vermelho) */}
      <div style={headerStyle}>
          {/* Logo Grande e Branco (Filtro Ativado) */}
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
            Bem-vindo de volta! {/* ⬅️ ALINHAMENTO ESQUERDA */}
          </h2>
          <p style={{ fontSize: isMobile ? '1rem' : '1.125rem', color: '#a0a0a0', textAlign: 'left', marginBottom: '1.5rem' }}>
            Acesse sua conta para continuar {/* ⬅️ ALINHAMENTO ESQUERDA */}
          </p>

          {error && (
            <div style={{ marginBottom: '1rem', padding: '1rem', background: '#dc3545', color: '#fff', borderRadius: 4 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={wrapper('email')} onFocus={() => setFocusField('email')} onBlur={() => setFocusField(null)}>
              <i className="bi bi-envelope-fill" style={icon('email')} />
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={input}
                required
              />
            </div>

            <div style={wrapper('password')} onFocus={() => setFocusField('password')} onBlur={() => setFocusField(null)}>
              <i className="bi bi-lock-fill" style={icon('password')} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua senha"
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
              Entrar
            </button>

            <div style={{ textAlign: 'left', fontSize: isMobile ? 14 : 16, color: '#a0a0a0' }}> {/* ⬅️ ALINHAMENTO ESQUERDA */}
              Não tem uma conta?{' '}
              <button type="button" style={{ background: 'none', border: 'none', color: '#CC0000', cursor: 'pointer' }} onClick={() => navigate('/register')}> 
                Cadastre-se
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