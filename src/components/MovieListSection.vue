<template>
  <section>
    <section>
      <movie-filter class="mb-6" />
    </section>
    <section class="mb-6">
      <h2 class="is-hidden">Movie list</h2>
      <loading-indicator v-if="isLoading" />
      <error-indicator v-else-if="isError" />
      <p v-else-if="!movies.length" class="title is-4">No movies were found</p>
      <div v-else>
        <movie-list :movies="movies" />
        <movie-pagination :totalPages="totalPages" />
      </div>
    </section>
  </section>
</template>

<script>
import MovieList from "../components/MovieList.vue";
import MoviePagination from "../components/MoviePagination.vue";
import MovieFilter from "../components/MovieFilter.vue";
export default {
  components: {
    MovieList,
    MoviePagination,
    MovieFilter,
  },
  data: function () {
    return {
      totalPages: 0,
      movies: [],
      isLoading: true,
      isError: false,
    };
  },
  created: function () {
    this.$store.dispatch("fetchGenres");
    this.$store.dispatch("fetchFavouriteMovies");
    this.fetchMovies();
  },
  computed: {
    query() {
      return this.$route.fullPath.slice(this.$route.fullPath.indexOf("?") + 1);
    },
  },
  watch: {
    $route() {
      this.fetchMovies();
    },
  },
  methods: {
    fetchMovies() {
      this.isLoading = true;
      this.$movieApi.getMovies(this.query).then(
        (data) => {
          this.movies = data.results;
          this.totalPages = data.total_pages;
          this.isLoading = false;
        },
        () => {
          this.isLoading = false;
          this.isError = true;
        }
      );
    },
  },
};
</script>
