import './styles.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

  return (
    <nav className='navbar'>
      <a href='/' className='brand'>
        Mini <span>Blog</span>
      </a>
      <ul className='links-list'>
        <li>
          <NavLink to='/' className={({isActive}) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to='/about' className={({isActive}) => (isActive ? 'active' : '')}>Sobre</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export { NavBar };
