export default {
	// namespaced: true,
	state: {
		options: {
			colorTheme: []
		},
		arrColorTheme: [{
				name: 'Темная',
				cssVar: [{
						prop: 'main-color',
						value: '33, 34, 50'
					},
					{
						prop: 'accent-color',
						value: '42, 41, 60'
					},
					{
						prop: 'text-color',
						value: '255, 255, 255'
					},
					{
						prop: 'delete-color',
						value: '222, 27, 44'
					},
					{
						prop: 'add-color',
						value: '60, 109, 184'
					},
					{
						prop: 'placeholder-color',
						value: '163, 163, 163'
					},
					{
						prop: 'highlight-color',
						value: '163, 163, 163'
					}
				]
			},
			{
				name: 'Светлая',
				cssVar: [{
						prop: 'main-color',
						value: '234, 234, 234'
					},
					{
						prop: 'accent-color',
						value: '210, 210, 210'
					},
					{
						prop: 'text-color',
						value: '0, 0, 0'
					},
					{
						prop: 'delete-color',
						value: '222, 27, 44'
					},
					{
						prop: 'add-color',
						value: '79, 201, 255'
					},
					{
						prop: 'placeholder-color',
						value: '163, 163, 163'
					},
					{
						prop: 'highlight-color',
						value: '163, 163, 163'
					}
				]
			}
		],
	},
	mutations: {
		saveOptions(state, payload) {
			let serialOptions = JSON.stringify(state.options);
			localStorage.setItem('botOptions', serialOptions);
		},
		changeColorTheme(state, payload) {
			state.options.colorTheme = payload;
			let arrCssVar = payload.cssVar;

			for (const cssVar of arrCssVar) {
				document.documentElement.style.setProperty(
					`--${cssVar.prop}`,
					` ${cssVar.value}`
				);
			}
		}
	},
	actions: {
		getSaveOptions(ctx, payload) {
			let optionsFromStorage = JSON.parse(localStorage.getItem('botOptions'));
			if (!optionsFromStorage) {
				return;
			}
			ctx.commit('changeColorTheme', optionsFromStorage.colorTheme);
		},
	},
	getters: {}
};