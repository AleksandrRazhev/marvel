import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './CharList.scss';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

class CharList extends Component {

  marvelService = new MarvelService();

  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  }

  componentDidMount = () => {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(charList => this.onCharListLoaded(charList))
      .catch(this.onError);
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true
    })
  }

  onCharListLoaded = (newCharList) => {
    let ended = false;

    if (newCharList.length < 9) ended = true;

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  }

  renderItems = () => {
    const list = this.state.charList.map(item => {
      return (
        <li
          className="char__item item"
          key={item.id}
          onClick={() => this.props.onCharSelected(item.id)}
        >
          <button className='item__button'>
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

  render() {

    const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const items = !(loading || error) ? this.renderItems(charList) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {items}
        <div className="char__button">
          <button
          style={charEnded ? {display: 'none'} : null}
            className="button button__main button__long"
            disabled={newItemLoading}
            onClick={() => this.onRequest(offset)}>
            <div className="inner">load more</div>
          </button>
        </div>
      </div>
    )
  }

};

export default CharList;
