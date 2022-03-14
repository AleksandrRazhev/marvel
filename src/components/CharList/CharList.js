import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './CharList.scss';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

class CharList extends Component {

  marvelService = new MarvelService();

  state = {
    charList: [],
    numberChars: 9,
    loading: true,
    error: false,
  }

  componentDidMount = () => {
    this.addCharList();
  }

  addCharList = () => {
    this.marvelService
      .getAllCharacters()
      .then(data => data.slice(0, this.state.numberChars))
      .then(charList => this.onCharListLoaded(charList))
      .catch(this.onError);
  }

  onCharListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
    });
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

    const { charList, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const items = !(loading || error) ? this.renderItems(charList) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {items}
        <div className="char__button">
          <div className="button button__main button__long">
            <div className="inner">load more</div>
          </div>
        </div>
      </div>
    )
  }

};

export default CharList;
