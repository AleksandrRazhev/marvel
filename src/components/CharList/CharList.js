import './CharList.scss';

import abyss from '../../resources/img/abyss.jpg';

const CharList = () => {
  return (
    <div className="char__list">
      <ul className="char__grid">
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item char__item_selected">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
        <li className="char__item">
          <img src={abyss} alt="Abyss" />
          <div className="char__name">Abyss</div>
        </li>
      </ul>
      <div className="char__button">
        <div className="button button__main button__long">
          <div className="inner">load more</div>
        </div>
      </div>
    </div>
  )
};

export default CharList;
