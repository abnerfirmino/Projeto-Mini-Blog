import './styles.css';
import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useState } from 'react';

const NavBar = () => {
  // pegando o context do usuário
  const { user } = useAuthContext();
  const [menuSelected, setMenuSelected] = useState(false);

  // logout
  const { logout } = useAuthentication();

  const handleLogout = () => {
    // encerra a sessão do usuário após o logout
    logout();

    // após o logout a página atual é recarregada
    // sem limpar o cache do navegador
    window.location.reload(false);
  };

  // menu responsivo
  const handleMenu = () => {
    setMenuSelected((s) => !s);
  };

  return (
    <header>
      <nav className="navbar">
        <a href="/" className="brand">
          Mini <span>Blog</span>
        </a>
        <ul className={'links-list ' + menuSelected}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Sobre
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Entrar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Cadastrar
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <NavLink
                  to="/posts/create"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Novo Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Visualizar Posts
                </NavLink>
              </li>
              {user && (
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
              )}
            </>
          )}
        </ul>
        <div className={'bars ' + menuSelected} onClick={handleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export { NavBar };
