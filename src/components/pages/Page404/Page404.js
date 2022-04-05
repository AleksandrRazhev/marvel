import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { Link } from "react-router-dom";

import './page404.scss';

const Page404 = () => {
  return (
    <div className="err404">
      <ErrorMessage />
      <p className="err404__message">Page doesn't exist!</p>
      <Link to='/' className="err404__link">
        Back to main page
      </Link>
    </div>
  )
}

export default Page404;
