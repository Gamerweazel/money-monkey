import template from './template.js'
import store from '../../store/store.js'
import router from '../../router/router.js'

const MainComponent = new Vue({
	el: '#app',
	router,
	store,
	template,
	data: {
		theme: 'light',
		expenses: [],
	},
	methods: {
		setTheme(theme) {
			this.theme = theme
		},
	},
	computed: {
		dark() {
			return this.theme === 'dark'
		},
	}
})


export default MainComponent