<template>
  <div class="movie-info-row">
    <h3 class="movie-info-row__title">{{ propertyName }}</h3>
    <p v-if="!propertyValues.length" class="movie-info-row__value-list">
      No info
    </p>
    <p
      v-else-if="propertyValues.length === 1"
      class="movie-info-row__value-list"
    >
      {{ propertyValues[0] ? propertyValues[0] : "No info" }}
    </p>
    <ul v-else class="movie-info-row__value-list">
      <li
        v-for="value in propertyValues"
        :key="value"
        class="movie-info-row__value-list-item"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    propertyName: String,
    propertyValues: [],
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.movie-info-row {
  display: flex;
  align-items: center;
  border: 2px solid $primary;
  border-radius: 0.25rem;
  &__title {
    flex-basis: 150px;
    flex-shrink: 0;
    padding-left: 0.5rem;
  }
  &__value-list {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem;
    border-left: 2px solid $primary;
    &-item {
      &:not(:last-child) {
        margin-right: 0.5rem;
        &::after {
          content: ",";
        }
      }
    }
  }
}
</style>
