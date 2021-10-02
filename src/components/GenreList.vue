<template>
  <ul class="genre-list">
    <li
      class="genre-list__item"
      v-for="genreName in genreNames"
      :key="genreName"
    >
      {{ genreName }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    genreNames: Array,
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.genre-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: -0.75rem;
  align-items: center;
  font-size: 0.75rem;
  &__item {
    border: 2px solid $primary;
    border-radius: 0.25rem;
    font-size: 1em;
    margin-right: 0.75em;
    margin-bottom: 0.75rem;
    padding: 0.25em;
  }
}
</style>
