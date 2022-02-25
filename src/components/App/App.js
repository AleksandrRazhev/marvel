import AppHeader from "../AppHeader/AppHeader";
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import AppBanner from "../AppBanner/AppBanner";
import ComicsList from "../ComicsList/ComicsList";
import SingleComic from "../SingleComic/SingleComic";
import Skeleton from '../Skeleton/Skeleton';


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
        <AppBanner />
        <ComicsList />
        <SingleComic />
        <Skeleton />
      </main>
    </div>
  )
}

export default App;
