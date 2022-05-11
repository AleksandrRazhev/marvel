import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import AppBanner from "../AppBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {

  const { id } = useParams();
  const [ data, setData ] = useState(null);

  const { loading, error, getCharacter, getComic, clearError } = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id])

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comic': getComic(id).then(data => onDataLoaded(data));
        break;
      case 'character':
        getCharacter(id).then(data => onDataLoaded(data));
    }

  }

  const onDataLoaded = (data) => {
    setData(data);
  }

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = (!loading || !error || data) ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {spinner}
      {errorMessage}
      {content}
    </>
  )
}

export default SinglePage;


