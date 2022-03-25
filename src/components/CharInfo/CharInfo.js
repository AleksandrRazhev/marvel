import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../Skeleton/Skeleton';

import './CharInfo.scss'

const CharInfo = (props) => {

  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId])

  const updateChar = () => {
    const { charId } = props;

    if (!charId) return;

    onCharLoading();
    marvelService
      .getCharacter(charId)
      .then(onCharLoaded)
      .catch(onError);
  }

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  }

  const onCharLoading = () => {
    setLoading(true);
  }

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  return (
    <>
      <div className="char__basics">
        <img className='char__basics-img' src={thumbnail} alt={name}
          style={(thumbnail.indexOf('image_not_available') !== -1) ? { objectFit: 'contain' } : null}
        />
        <div className='char__basics-text'>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <p className="char__descr">{description}</p>
      <span className="char__comics">Comics:</span>
      <ul className="char__comics-list">
        {comics.length === 0 ? <span>Comics of this character are not finded</span> : null}
        {comics.slice(0, 10).map((item, i) => <li key={i} className="char__comics-item">{item.name}</li>)}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;
