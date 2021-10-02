<template>
  <transition-group name="list" tag="ul" class="watch-list">
    <li v-for="movie in movies" :key="movie.id" class="list-item">
      <watch-list-item :movie="movie" />
    </li>
  </transition-group>
</template>

<script>
import WatchListItem from "./WatchListItem.vue";
export default {
  components: { WatchListItem },
  props: {
    movies: Array,
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.watch-list {
  & > li {
    margin-bottom: 2rem;
  }
}
.list-item {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.list-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}
</style>
