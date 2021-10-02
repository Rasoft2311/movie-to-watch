<template>
  <nav
    class="side-padding-touch side-padding-desktop navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link :to="{ name: 'MoviesPage' }" class="navbar-item navbar-logo"
        >🄼🄾🅅🄸🄴 🅃🄾 🅆🄰🅃🄲🄷</router-link
      >
      <movie-search class="navbar__search" />
      <a
        @click="isActive = !isActive"
        :class="{ 'is-active': isActive }"
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div :class="{ 'is-active': isActive }" class="navbar-menu">
      <div class="navbar-end">
        <router-link :to="{ name: 'WatchListPage' }" class="navbar-item"
          >Watch List</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
import MovieSearch from "./MovieSearch.vue";
export default {
  components: {
    MovieSearch,
  },
  data: function () {
    return {
      isActive: false,
    };
  },
  watch: {
    $route() {
      if (this.isActive) this.isActive = false;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.navbar {
  border-bottom: 2px solid $primary;
  background-color: $background-primary;
  &__search {
    margin-left: 1rem;
    @include touch {
      margin-left: auto;
    }
  }
  &-menu {
    background-color: transparent;
  }
  &-item {
    font-size: 1.25rem;
    &:hover,
    &:focus {
      color: $primary !important;
      background-color: transparent !important;
    }
    &.router-link-exact-active {
      color: $primary;
    }
  }
  &-logo {
    font-size: 1.5rem;
    color: $primary;
    @include mobile {
      padding: 0.25rem;
      font-size: 1.15rem;
    }
  }
  &-burger {
    color: $primary;
    @include touch {
      margin-left: 0.5rem;
    }
    &:hover,
    :focus {
      color: $primary;
      background-color: transparent;
    }
    &.is-active {
      & span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
    }
    & span {
      width: auto;
      height: 3px;
      left: 10px;
      right: 10px;
      &:nth-child(1) {
        top: calc(50% - 8px);
      }
      &:nth-child(3) {
        top: calc(50% + 6px);
      }
    }
  }
}
</style>
