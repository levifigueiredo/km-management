import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import logo from '../assets/cse.png'; 
import { useAuth } from '../context/AuthContext'; // ⬅️ IMPORTADO

const Sidebar = ({ isMobile }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth(); // ⬅️ USANDO O HOOK
  const navigate = useNavigate();

  useEffect(() => {
    // Esconder a sidebar em telas pequenas por padrão
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const handleLogout = () => {
    logout(); // ⬅️ USANDO LOGOUT DO CONTEXTO
    navigate('/login');
  };

  return (
    <aside className={`sidebar bg-sidebar text-white ${collapsed ? 'collapsed' : ''}`} style={{ width: collapsed ? 80 : 250 }}>
      <div className={`p-3 d-flex align-items-center ${collapsed ? "justify-content-center" : "justify-content-start"}`}>
        <img
          src={logo}
          alt="Logo"
          height={32}
          className="me-2"
          style={{ filter: "brightness(0) invert(1)" }}
        />
        {!collapsed && <span className="text-white fw-bold fs-5">KM Management</span>} {/* ⬅️ NOVO NOME */}
        {collapsed && <span className="text-white fw-bold fs-5">KM</span>} {/* ⬅️ ABREVIAÇÃO */}
      </div>
      <Nav className="flex-column p-2">
        {/* Toggle Button */}
        <Nav.Item className="d-none d-lg-block">
          <Nav.Link 
            onClick={() => setCollapsed(!collapsed)}
            className="text-secondary d-flex align-items-center justify-content-center"
            style={{ 
                borderRadius: '5px', 
                backgroundColor: 'transparent', 
                cursor: 'pointer',
                marginBottom: '1rem' 
            }}
          >
            <i className={`bi ${collapsed ? 'bi-arrow-right-circle' : 'bi-arrow-left-circle'} fs-4 text-white`} />
            {!collapsed && <span className="ms-2">Esconder</span>}
          </Nav.Link>
        </Nav.Item>

        {/* Home/Dashboard */}
        <Nav.Item className="mb-2">
          <Nav.Link as={NavLink} to="/home" end className="text-white d-flex align-items-center" style={{ borderRadius: '5px' }}>
            <i className="bi bi-speedometer2 fs-4" />
            {!collapsed && <span className="ms-3">Dashboard</span>}
          </Nav.Link>
        </Nav.Item>

        {/* Clients */}
        <Nav.Item className="mb-2">
          <Nav.Link as={NavLink} to="/clients" className="text-white d-flex align-items-center" style={{ borderRadius: '5px' }}>
            <i className="bi bi-people fs-4" />
            {!collapsed && <span className="ms-3">Clientes</span>}
          </Nav.Link>
        </Nav.Item>

        {/* Tasks/Agenda */}
        <Nav.Item className="mb-2">
          <Nav.Link as={NavLink} to="/agenda" className="text-white d-flex align-items-center" style={{ borderRadius: '5px' }}>
            <i className="bi bi-calendar-check fs-4" />
            {!collapsed && <span className="ms-3">Agenda</span>}
          </Nav.Link>
        </Nav.Item>

        {/* Budget */}
        <Nav.Item className="mb-2">
          <Nav.Link as={NavLink} to="/orcamentos" className="text-white d-flex align-items-center" style={{ borderRadius: '5px' }}>
            <i className="bi bi-card-checklist fs-4" />
            {!collapsed && <span className="ms-3">Orçamentos</span>}
          </Nav.Link>
        </Nav.Item>

        {/* Settings */}
        <Nav.Item className="mb-2">
          <Nav.Link as={NavLink} to="/settings" className="text-white d-flex align-items-center" style={{ borderRadius: '5px' }}>
            <i className="bi bi-gear fs-4" />
            {!collapsed && <span className="ms-3">Configurações</span>}
          </Nav.Link>
        </Nav.Item>

        {/* Logout (Fixo no Fundo) */}
        <div className="mt-auto pt-2">
          <Nav.Item>
            <Nav.Link 
              onClick={handleLogout} 
              className="text-danger d-flex align-items-center" 
              style={{ borderRadius: '5px', cursor: 'pointer' }}
            >
              <i className="bi bi-box-arrow-right fs-4" />
              {!collapsed && <span className="ms-3">Sair</span>}
            </Nav.Link>
          </Nav.Item>
        </div>
      </Nav>
    </aside>
  );
};

export default Sidebar;