import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

// add element-ui lib
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale });

// $axios for http req
import axios, { AxiosInstance } from "axios";
declare module "Vue/types/vue" {
  interface Vue {
    $axios: AxiosInstance;
  }
}
// 请求拦截。所有http请求增加token
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      "Content-Type": " application/json"
    };

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
axios.defaults.baseURL = "http://localhost:3002/";
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
