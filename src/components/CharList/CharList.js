import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import './CharList.scss';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

const CharList = (props) => {

  const [charList, setCharList] = useState([]);

  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  const arrRefs = useRef([]);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(charList => onCharListLoaded(charList));
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) ended = true;

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  }

  const charSelect = i => {
    arrRefs.current.forEach(item => item.parentElement.classList.remove('char__item_selected'));
    arrRefs.current[i].parentElement.classList.add('char__item_selected');
  }

  const renderItems = () => {
    const list = charList.map((item, i) => (
      <CSSTransition key={item.id} timeout={1000} classNames="char__item">
        <li
          className="char__item item"
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
      </CSSTransition>
    ))

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>
        {list}
        </TransitionGroup>
      </ul>
    );
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const items = charList ? renderItems(charList) : null;

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
