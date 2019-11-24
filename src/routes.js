import VueRouter from 'vue-router';

import MainScreen from '@/components/MainScreen.vue';
import Menu from '@/components/Menu.vue';
import YouTubeVideo from '@/components/youTubeVideo/YouTubeVideo.vue';
import YouTubeVideoOptions from '@/components/youTubeVideo/Options.vue';
import YouTubeVideoExplanation from '@/components/youTubeVideo/Explanation.vue';
import YouTubeVideoTrick from '@/components/youTubeVideo/MagicTrick.vue';
import Numbers from '@/components/numbers/Numbers.vue';
import NumbersOptions from '@/components/numbers/Options.vue';
import NumbersExplanation from '@/components/numbers/Explanation.vue';
import NumbersTrick from '@/components/numbers/MagicTrick.vue';

export default new VueRouter({
	routes: [{
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
		},
		{
			path: '/youtubevideo/options',
			component: YouTubeVideoOptions
		},
		{
			path: '/youtubevideo/explanation',
			component: YouTubeVideoExplanation
		},
		{
			path: '/youtubevideo/trick',
			component: YouTubeVideoTrick
		},
		{
			path: '/numbers',
			component: Numbers
		},
		{
			path: '/numbers/options',
			component: NumbersOptions
		},
		{
			path: '/numbers/explanation',
			component: NumbersExplanation
		},
		{
			path: '/numbers/trick',
			component: NumbersTrick
		},
	],
	mode: 'history'
});