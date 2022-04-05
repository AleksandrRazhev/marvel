import useHttp from "../components/hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=8dfa389cf399098ed09643800364440f';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    try {
      const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCaracter);
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  const getCharacter = async (id) => {
    try {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCaracter(res.data.results[0]);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const getAllComics = async (offset = 0) => {
    try {
      const response = await request(`${_apiBase}comics?&orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
      return response.data.results;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  const getComic = async (id) => {
    try {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComic(res.data.results[0]);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const _transformCaracter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'This character is not have description',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || 'There is no description',
      pageCount: comic.pageCount ? `${comic.pageCount} р.` : 'No information about the number of pages',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      language: comic.textObjects.language || 'en-us',
      price: comic.prices.price ? `${comic.prices.price}$` : 'notAvaliable',
    }
  }

  return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic };
}

export default useMarvelService;
