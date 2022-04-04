import { Link, NavLink } from 'react-router-dom';

import './AppHeader.scss';

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
          <li><NavLink exact activeClassName='js-active' to="/">Characters</NavLink></li>
          <span>/</span>
          <li><NavLink exact activeClassName='js-active' to="/comics">Comics</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
