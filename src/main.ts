import Vue from 'vue';
import App from './App.vue';
import VuePictureCut from './lib';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(VuePictureCut);
Vue.use(ElementUI, { size: 'mini'});

new Vue({
  el: '#app',
  render: h => h(App),
}).$mount('#app')
