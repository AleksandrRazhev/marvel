import { Link, NavLink } from 'react-router-dom';

import './AppHeader.scss';

const activeLink = ({ isActive }) => isActive ? "js-active" : null;

const AppHeader = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>
        <Link to="/">
          <span>Marvel</span> information portal
        </Link>
      </h1>
      <nav className="header__nav">
        <ul>
          <li><NavLink className={activeLink} end to="/">Characters</NavLink></li>
          <span>/</span>
          <li><NavLink className={activeLink} end to="/comics">Comics</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
