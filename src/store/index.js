import Vue from 'vue';
import Vuex from 'vuex';
import options from './options';
import youTubeVideo from './youTubeVideo.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		
	},
	modules: {
		options,
		youTubeVideo
	}
});