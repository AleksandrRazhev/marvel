import AppHeader from "../AppHeader/AppHeader";
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";


import decoration from '../../resources/img/vision.png';

const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList />
          <CharInfo />
        </div>
        <img src={decoration} alt="vision" className="bg-decoration" />
      </main>
    </div>
  )
}

export default App;
