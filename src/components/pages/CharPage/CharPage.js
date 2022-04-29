import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../../services/MarvelService";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import AppBanner from "../../AppBanner/AppBanner";

import './CharPage.scss';

const CharPage = () => {

  const { charId } = useParams();

  const [char, setChar] = useState(null);

  const { loading, error, getCharacter } = useMarvelService();

  useEffect(() => {
    getCharacter(charId).then(data => setChar(data));
  }, [])

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  const character = char ?
    <>
      <img className="char__img" src={char.thumbnail} alt={char.name} />
      <div className="char__block">
        <h2 className="char__name">{char.name}</h2>
        <p className="char__desc">{char.description}</p>
      </div>
    </> :
    null;

  return (
    <>
      <AppBanner />
      <div className='char'>
        {spinner}
        {errorMessage}
        {character}
      </div>
    </>
  )
}

export default CharPage;
