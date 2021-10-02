<template>
  <ul class="cast-list custom-vertical-scroll">
    <li class="cast-list__item" v-for="actor in cast" :key="actor.id">
      <figure v-if="actor.profile_path">
        <img
          :src="$movieApi.getImagePath(actor.profile_path, 'w185')"
          :alt="`${actor.name}`"
          class="cast-list__image"
          loading="lazy"
        />
        <figcaption class="p-1">
          <p class="cast-list__actor-name">{{ actor.name }}</p>
          <p>{{ actor.character }}</p>
        </figcaption>
      </figure>
      <div v-else class="cast-list__empty">
        <div class="cast-list__empty-image">No Image</div>
        <p class="cast-list__actor-name">{{ actor.name }}</p>
        <p>{{ actor.character }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    cast: Array,
  },
};
</script>

<style lang="scss">
.cast-list {
  display: flex;
  margin-bottom: -0.75rem;
  overflow-x: auto;
  font-size: 0.75rem;
  &__item {
    width: 150px;
    flex-shrink: 0;
    border-radius: 0.25rem;
    font-size: 1em;
    margin-right: 0.75em;
    margin-bottom: 0.75rem;
  }
  &__empty {
    display: flex;
    flex-direction: column;
    height: 100%;
    text-align: center;
    &-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 225px;
      font-size: 1.3rem;
    }
    & .cast-list__actor-name {
      margin-top: 0.5rem;
    }
  }
  &__actor-name {
    font-size: 1.2rem;
    line-height: 1.2rem;
  }
}
</style>
