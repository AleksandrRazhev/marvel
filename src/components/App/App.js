import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import AppHeader from "../AppHeader/AppHeader";
import { SingleComicPage } from '../pages'

const Page404 = lazy(() => import('../pages/Page404/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));


const App = () => {

  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<span>Loading...</span>}>
            <Routes>
              <Route path='*' element={<Page404 />} />
              <Route path='/' element={<MainPage />} />
              <Route path='/comics' element={<ComicsPage />} />
              <Route path='/comics/:comicId' element={<SingleComicPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router >
  )
}

export default App;
