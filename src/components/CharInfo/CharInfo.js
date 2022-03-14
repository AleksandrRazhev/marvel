import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../Skeleton/Skeleton';

import './CharInfo.scss'

class CharInfo extends Component {

  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) this.updateChar();
  }

  updateChar = () => {
    const { charId } = this.props;

    if (!charId) return;

    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  }

  onCharLoading = () => {
    this.setState({
      loading: true,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  }

  render() {
    const { char, loading, error } = this.state;

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
  }
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

export default CharInfo;
