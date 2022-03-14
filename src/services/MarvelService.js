class MarvelService {
  #apiBase = 'https://gateway.marvel.com:443/v1/public/';
  #apiKey = 'apikey=8dfa389cf399098ed09643800364440f';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this.#apiBase}characters?limit=9&offset=210&${this.#apiKey}`);
    return res.data.results.map(this.#transformCaracter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this.#apiBase}characters/${id}?${this.#apiKey}`);
    return this.#transformCaracter(res.data.results[0]);
  }

  #transformCaracter = (char) => {
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
}

export default MarvelService;
