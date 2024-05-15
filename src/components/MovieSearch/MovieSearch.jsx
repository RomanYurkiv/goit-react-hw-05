import css from "./MovieSearch.module.css";

const MovieSearch = ({ updateQueryParams }) => {
  function handleSubmit(event) {
    event.preventDefault();
    updateQueryParams(event.currentTarget.elements.query.value);
  }

  return (
    <div className={css.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <input
            className={css.searchInput}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
          <button className={css.searchButton} type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieSearch;
