import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';

import './CharList.scss';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

const CharList = (props) => {

  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const marvelService = new MarvelService();

  const arrRefs = useRef([]);

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService
      .getAllCharacters(offset)
      .then(charList => onCharListLoaded(charList))
      .catch(onError);
  }

  const onCharListLoading = () => {
    setNewItemLoading(true);
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) ended = true;

    setCharList(charList => [...charList, ...newCharList]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  }

  const onError = () => {
    setError(true);
    setLoading(false);
  }

  const charSelect = i => {
    arrRefs.current.forEach(item => item.parentElement.classList.remove('char__item_selected'));
    arrRefs.current[i].parentElement.classList.add('char__item_selected');
  }

  const renderItems = () => {
    const list = charList.map((item, i) => {
      return (
        <li
          className="char__item item"
          key={item.id}
          onClick={() => props.onCharSelected(item.id)}
        >
          <button
            className='item__button'
            onFocus={() => charSelect(i)}
            ref={elem => arrRefs.current[i] = elem}
          >
            <img src={item.thumbnail} alt={item.name} className='item__img' />
            <div className="item__name">{item.name}</div>
          </button>
        </li>
      )
    })

    return (
      <ul className="char__grid">
        {list}
      </ul>
    );
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const items = !(loading || error) ? renderItems(charList) : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <div className="char__button">
        <button
          style={charEnded ? { display: 'none' } : null}
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </div>
  )
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList;
