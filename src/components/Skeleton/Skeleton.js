import './Skeleton.scss';

const Skeleton = () => {
  return (
    <>
      <p className="char__select">Please select a character to see information</p>
      <div className="skeleton">
        <div className="pulse skeleton__header">
          <span className="pulse skeleton__circle"></span>
          <span className="pulse skeleton__mini"></span>
        </div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
        <div className="pulse skeleton__block"></div>
      </div>
    </>
  )
}

export default Skeleton;
