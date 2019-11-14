import Vue from 'vue';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import '../public/css/style.css';

import router from './routes';

Vue.config.productionTip = false;
Vue.use(VueRouter);

new Vue({
	store,
	router,
	render: h => h(App),
}).$mount('#app');