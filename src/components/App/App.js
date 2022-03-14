import { Component } from "react";

import AppHeader from "../AppHeader/AppHeader";
import RandomChar from "../RandomChar/RandomChar";
import CharList from "../CharList/CharList";
import CharInfo from "../CharInfo/CharInfo";
import AppBanner from "../AppBanner/AppBanner";
import ComicsList from "../ComicsList/ComicsList";
import SingleComic from "../SingleComic/SingleComic";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


import decoration from '../../resources/img/vision.png';

class App extends Component {

  state = {
    selectedChar: null,
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
          </div>
          <img src={decoration} alt="vision" className="bg-decoration" />
          <AppBanner />
          <ComicsList />
          <SingleComic />
        </main>
      </div>
    )
  }
}

export default App;
