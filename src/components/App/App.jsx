import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
// import HomePage from "../../pages/HomePage/HomePage";
// import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
// import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import Navigation from "../Navigation/Navigation";
import css from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const App = () => {
  return (
    <div className={css.appContainer}>
      <Navigation />

      <Suspense fallback={<b>Loading...</b>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
