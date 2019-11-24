import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import '../public/css/style.css';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

import router from './routes';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper);

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app');