<template>
  <div class="movie-rating">
    <span class="movie-rating__number">{{ rating }}/10</span>
    <star-icon width="30px" height="30px" />
  </div>
</template>

<script>
export default {
  props: {
    rating: Number,
  },
};
</script>

<style lang="scss">
.movie-rating {
  display: flex;
  align-items: center;
  &__number {
    margin-right: 0.5rem;
    font-size: 1.3rem;
  }
}
</style>
