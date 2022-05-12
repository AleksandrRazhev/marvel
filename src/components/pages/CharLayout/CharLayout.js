import { Helmet } from 'react-helmet'

import './CharLayout.scss';

const CharPage = ({ data }) => {

  const character = () => {
    const { thumbnail, name, description } = data;


    return (
      <div className='char'>
        <Helmet>
          <meta
            name="description"
            content={`${name} character page`}
          />
          <title>{name}</title>
        </Helmet>
        <img className="char__img" src={thumbnail} alt={name} />
        <div className="char__block">
          <h2 className="char__name">{name}</h2>
          <p className="char__desc">{description}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {data ? character() : null}
    </>
  )
}

export default CharPage;
