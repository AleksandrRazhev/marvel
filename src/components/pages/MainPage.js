import { useState } from "react";

import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import FindForm from "../FindForm/FindForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  }

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <FindForm />
          </ErrorBoundary>
        </div>
      </div>
      <img src={decoration} alt="vision" className="bg-decoration" />
    </>
  )
}

export default MainPage;
