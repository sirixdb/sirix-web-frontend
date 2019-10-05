import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

// add element-ui lib
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import buildDependencyContainer from './app.container';
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

buildDependencyContainer();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
