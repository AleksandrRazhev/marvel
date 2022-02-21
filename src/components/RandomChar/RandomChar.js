import '../../style/buttons.scss';
import './RandomChar.scss';

import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  return (
    <div className="randomchar">
      <div className="randomchar__block">
        <img src={thor} alt="Random character" className="randomchar__img" />
        <div className="randomchar__info">
          <p className="randomchar__name">Thor</p>
          <p className="randomchar__descr">As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...</p>
          <div className="randomchar__btns">
            <a href="#" className="button button__main">
              <p className="inner">homepage</p>
            </a>
            <a href="#" className="button button__secondary">
              <p className="inner">Wiki</p>
            </a>
          </div>
        </div>
      </div>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today! <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main">
          <p className="inner">try it</p>
        </button>
        <span style={
          {
            backgroundImage: `url(${mjolnir})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '35px -14px',
            backgroundSize: 'cover',
          }
        } className="randomchar__decoration"></span>
      </div>
    </div>
  )
};

export default RandomChar;
