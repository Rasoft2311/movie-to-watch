export const variables = {
  getMovieUrl(id) {
    return `/movie/${id}?append_to_response=credits,similar`;
  },
  getMovieImageUrl(path, width) {
    if (!path)
      return "http://underscoremusic.co.uk/site/wp-content/uploads/2014/05/no-poster.jpg";
    return `https://image.tmdb.org/t/p/${width}${path}`;
  },
  getMoviesUrl(query) {
    return `/discover/movie?${query}`;
  },
  getGenresUrl() {
    return "/genre/movie/list";
  },
  searchMoviesUrl(query) {
    return `/search/movie?query=${query}`;
  },
};
