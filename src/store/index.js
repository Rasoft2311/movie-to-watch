import Vue from "vue";
import Vuex from "vuex";
import { favourite } from "./modules/favourite";
import { genres } from "./modules/genres";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    favourite,
    genres,
  },
});
