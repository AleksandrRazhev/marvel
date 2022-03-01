import errorImg from './error.gif';

const ErrorMessage = () => {
  return (
    <img style={{
      display: 'block',
      width: '250px',
      height: '250px',
      margin: '0 auto',
      objectFit: 'contain',
    }} src={errorImg} alt="error" />
  )
}

export default ErrorMessage;
