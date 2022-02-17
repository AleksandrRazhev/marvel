import './AppHeader.scss';

const AppHeader = () => {
  return (
    <header className='header'>
      <h1 className='header__title'>
        <a href="#">
          <span>Marvel</span> information portal
        </a>
      </h1>
      <nav className="header__nav">
        <ul>
          <li><a href="#">Characters</a></li>
          <span>/</span>
          <li><a href="#">Comics</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
