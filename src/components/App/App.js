import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../AppHeader/AppHeader";
import SinglePage from "../pages/SinglePage";

const Page404 = lazy(() => import('../pages/Page404/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const CharLayout = lazy(() => import('../pages/CharLayout/CharLayout'));
const SingleComicLayout = lazy(() => import('../pages/SingleComicLayout/SingleComicLayout'));

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
              <Route path='/comics/:id' element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />
              <Route path='/characters/:id' element={<SinglePage Component={CharLayout} dataType='character' />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router >
  )
}

export default App;
