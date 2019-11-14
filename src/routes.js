import VueRouter from 'vue-router';

import MainScreen from './components/MainScreen.vue';
import Menu from './components/Menu.vue';
import YouTubeVideo from './components/YouTubeVideo.vue';

export default new VueRouter({
	routes: [
		{
			path: '/',
			component: MainScreen
		},
		{
			path: '/menu',
			component: Menu
		},
		{
			path: '/youtubevideo',
			component: YouTubeVideo
		}
	],
	mode: 'history'
});