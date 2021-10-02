import * as movieApiMethods from "../api";
export const MovieApiPlugin = {
  install(Vue) {
    Vue.prototype.$movieApi = {
      ...movieApiMethods,
    };
  },
};
