import { useState, useEffect } from 'react';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './ComicsList.scss';

const ComicsList = () => {

  const [comics, setComics] = useState([]);

  const [newLoading, setNewLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [ended, setEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial=false) => {
    initial ? setNewLoading(false) : setNewLoading(true);
    getAllComics(offset)
      .then(data => comicsLoaded(data));
  }

  const comicsLoaded = (newComics) => {
    let ended = false;

    if (newComics.length < 8) ended = true;
    setComics(comics => [...comics, ...newComics]);
    setNewLoading(false)
    setOffset(offset => offset + 8)
    setEnded(ended);
  }

  const comicsItems = () => {
    const list = comics.map((item, i) => {
    const imageNone = item.thumbnail.path.indexOf('image_not_available') !== -1;
    const imageNoneStyle = imageNone ? 'image-none' : '';

      return (
        <li key={`${item.id}-${i}`} className="comics__item comics-item">
          <a className={`comics-item__link ${imageNoneStyle}`} href='#'>
            <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="ultimate war" className="comics-item__img" />
            <div className="comics-item__name">
              {item.title}
            </div>
            <div className="comics-item__price">
              {item.prices[0].price ?  item.prices[0].price + '$' : 'NOT AVAILABLE'}
            </div>
          </a>
        </li>
      )
    })

    return (
      <ul className="comics__grid">
        {list}
      </ul>
    )
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newLoading ? <Spinner /> : null;
  const comicsRender = comics ? comicsItems() : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {comicsRender}
      <div className="comics__button">
        <button
          style={ended ? { display: 'none' } : null}
          className="button button__main button__long"
          disabled={newLoading}
          onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    </div>
  )
}

export default ComicsList;
