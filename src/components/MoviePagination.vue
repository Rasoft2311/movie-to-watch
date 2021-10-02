<template>
  <nav
    class="movie-pagination pagination is-centered"
    role="navigation"
    aria-label="pagination"
  >
    <div
      v-if="currentPage === 1"
      class="pagination-previous pagination-previous--disabled"
    >
      Previous
    </div>
    <router-link
      v-else
      :to="{
        name: $route.name,
        query: { ...$route.query, page: currentPage - 1 },
      }"
      class="pagination-previous"
      :aria-label="`Goto page ${currentPage - 1}`"
      >Previous</router-link
    >
    <div
      v-if="currentPage === totalPages"
      class="pagination-next pagination-next--disabled"
    >
      Next Page
    </div>
    <router-link
      v-else
      :to="{
        name: $route.name,
        query: { ...$route.query, page: currentPage + 1 },
      }"
      class="pagination-next"
      :aria-label="`Goto page ${currentPage + 1}`"
      >Next page</router-link
    >
    <ul class="pagination-list">
      <template v-if="totalPages <= 10">
        <li v-for="page in totalPages" :key="page">
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: page },
            }"
            class="pagination-link"
            :class="page === currentPage ? 'is-current' : null"
            :aria-label="`Goto page ${page}`"
            :aria-current="page === currentPage ? 'page' : null"
            >{{ page }}</router-link
          >
        </li>
      </template>
      <template v-else-if="currentPage < 4">
        <li v-for="page in 4" :key="page">
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: page },
            }"
            class="pagination-link"
            :class="page === currentPage ? 'is-current' : null"
            :aria-label="`Goto page ${page}`"
            :aria-current="page === currentPage ? 'page' : null"
            >{{ page }}</router-link
          >
        </li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: totalPages },
            }"
            class="pagination-link"
            :aria-label="`Goto page ${totalPages}`"
            >{{ totalPages }}</router-link
          >
        </li>
      </template>
      <template v-else-if="currentPage > totalPages - 3">
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: 1 },
            }"
            class="pagination-link"
            aria-label="Goto page 1"
          >
            1
          </router-link>
        </li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li v-for="page in [3, 2, 1, 0]" :key="totalPages - page">
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: totalPages - page },
            }"
            class="pagination-link"
            :class="totalPages - page === currentPage ? 'is-current' : null"
            :aria-label="`Goto page ${totalPages - page}`"
            :aria-current="totalPages - page === currentPage ? 'page' : null"
            >{{ totalPages - page }}</router-link
          >
        </li>
      </template>
      <template v-else>
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: 1 },
            }"
            class="pagination-link"
            aria-label="Goto page 1"
            >{{ 1 }}</router-link
          >
        </li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: currentPage - 1 },
            }"
            class="pagination-link"
            :aria-label="`Goto page ${currentPage - 1}`"
            >{{ currentPage - 1 }}</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: currentPage },
            }"
            class="pagination-link is-current"
            :aria-label="`Goto page ${currentPage}`"
            aria-current="page"
            >{{ currentPage }}</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: currentPage + 1 },
            }"
            class="pagination-link"
            :aria-label="`Goto page ${currentPage + 1}`"
            >{{ currentPage + 1 }}</router-link
          >
        </li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li>
          <router-link
            :to="{
              name: $route.name,
              query: { ...$route.query, page: totalPages },
            }"
            class="pagination-link"
            :aria-label="`Goto page ${totalPages}`"
            >{{ totalPages }}</router-link
          >
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalPages: Number,
  },
  computed: {
    currentPage() {
      return isNaN(parseInt(this.$route.query.page))
        ? 1
        : parseInt(this.$route.query.page);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";
.movie-pagination {
  margin-top: 3rem;
}
.pagination-previous,
.pagination-next,
.pagination-link {
  color: $text-primary;
  border-color: $text-primary;
  &:hover,
  &:focus {
    color: $primary;
    border-color: $primary;
  }
  &--disabled {
    opacity: 0.7;
    background: transparent;
    &:hover,
    :focus {
      border-color: $text-primary;
      color: $text-primary;
    }
  }
}
.pagination-link.is-current {
  border: none;
  color: $background-primary;
  background-color: $primary;
  pointer-events: none;
}
</style>
