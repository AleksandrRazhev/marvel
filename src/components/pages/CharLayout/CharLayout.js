import './CharLayout.scss';

const CharPage = ({data}) => {

  const character = () => (
    <div className='char'>
      <img className="char__img" src={data.thumbnail} alt={data.name} />
      <div className="char__block">
        <h2 className="char__name">{data.name}</h2>
        <p className="char__desc">{data.description}</p>
      </div>
    </div>
  )

  return (
    <>
      {data ? character() : null}
    </>
  )
}

export default CharPage;
