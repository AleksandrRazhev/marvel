import { Helmet } from 'react-helmet'

import AppBanner from "../AppBanner/AppBanner";
import ComicsList from "../ComicsList/ComicsList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Page with comics"
        />
        <title>Comics page</title>
      </Helmet>
      <ErrorBoundary>
        <AppBanner />
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage;
