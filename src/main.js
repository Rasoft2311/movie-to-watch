import "./main.scss";
import Vue from "vue";
import App from "./App.vue";
import { registerBaseComponents } from "./helpers/registerBaseComponents";
import { MovieApiPlugin } from "./plugins/MovieApiPlugin";
import router from "./router";
import store from "./store";
import VScrollLock from "v-scroll-lock";
import vClickOutside from "v-click-outside";

Vue.config.productionTip = false;
Vue.use(VScrollLock);
Vue.use(vClickOutside);
Vue.use(MovieApiPlugin);
registerBaseComponents(Vue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
