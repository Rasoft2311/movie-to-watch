import Vue from "vue";
import VueRouter from "vue-router";
import MoviesPage from "../views/MoviesPage.vue";
import MoviePage from "../views/MoviePage.vue";
import WatchListPage from "../views/WatchListPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/movies",
  },
  {
    path: "/movies",
    name: "MoviesPage",
    component: MoviesPage,
  },
  {
    path: "/movies/:id",
    name: "MoviePage",
    component: MoviePage,
  },
  {
    path: "/watch-list",
    name: "WatchListPage",
    component: WatchListPage,
  },
];

const router = new VueRouter({
  scrollBehavior: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  },
  routes,
});

export default router;
