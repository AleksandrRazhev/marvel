import AppBanner from "../AppBanner/AppBanner";
import ComicsList from "../ComicsList/ComicsList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <ErrorBoundary>
        <AppBanner />
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage;
