import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import '../../style/buttons.scss';
import './RandomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(data => onCharLoaded(data));
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="randomchar" >
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today! <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button className="button button__main" onClick={updateChar}>
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

const View = (props) => {
  const { name, description, thumbnail, homepage, wiki } = props.char;
  const imageNot = thumbnail ? (thumbnail.indexOf('image_not_available')) : null;

  return (
    <div className="randomchar__block">
      <img
        style={imageNot !== -1 ? { objectFit: 'contain' } : null}
        src={thumbnail} alt="Random character" className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <p className="inner">homepage</p>
          </a>
          <a href={wiki} className="button button__secondary">
            <p className="inner">Wiki</p>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;
