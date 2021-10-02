<template>
  <ul class="recommendation-list custom-vertical-scroll">
    <li
      class="recommendation-list__item"
      v-for="movie in recommendations"
      :key="movie.id"
    >
      <router-link :to="{ name: 'MoviePage', params: { id: movie.id } }">
        <figure>
          <img
            :src="$movieApi.getImagePath(movie.poster_path, 'w342')"
            :alt="`${movie.title}`"
            class="recommendation-list__image"
            loading="lazy"
          />
          <figcaption class="p-1">
            <p class="recommendation-list__title">
              {{ movie.title }} ({{ getReleaseDate(movie.release_date) }})
            </p>
          </figcaption>
        </figure>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { getYearFomFullDate } from "../helpers/format";
export default {
  props: {
    recommendations: Array,
  },
  methods: {
    getReleaseDate(date) {
      return getYearFomFullDate(date);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.recommendation-list {
  display: flex;
  margin-bottom: -0.75rem;
  overflow-x: auto;
  font-size: 0.75rem;
  &__item {
    width: 220px;
    flex-shrink: 0;
    border-radius: 0.25rem;
    font-size: 1em;
    margin-right: 2em;
    margin-bottom: 0.75rem;
  }
  &__title {
    font-size: 1rem;
    line-height: 1rem;
  }
}
</style>
