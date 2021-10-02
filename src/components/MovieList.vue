<template>
  <ul class="movie-list columns is-multiline">
    <li
      v-for="movie in movies"
      :key="movie.id"
      class="column is-4-desktop is-6-tablet is-12-mobile"
    >
      <movie-list-item :movie="movie" />
    </li>
  </ul>
</template>

<script>
import MovieListItem from "./MovieListItem.vue";
export default {
  components: { MovieListItem },
  props: {
    movies: Array,
  },
};
</script>
