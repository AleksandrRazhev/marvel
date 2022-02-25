import './AppBanner.scss';

import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => {
  return (
    <div className="banner">
      <div style={{ backgroundImage: `url(${avengers})`, }} className="banner__notcontext"></div>
      <div className="banner__text">
        <p>New comics every week!</p>
        <p>Stay tuned!</p>
      </div>
      <img src={avengersLogo} alt="avengersLogo" />
    </div>
  )
}

export default AppBanner;
