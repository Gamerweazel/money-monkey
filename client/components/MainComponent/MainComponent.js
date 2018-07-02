import ExpenseView from '../ExpenseView/ExpenseView.js'
import AboutView from '../AboutView/AboutView.js'
import StatsView from '../StatsView/StatsView.js'
import template from './template.js'
import store from '../../store/store.js'

const routes = [
	{ path: '/about', component: AboutView },
	{ path: '/dash', component: ExpenseView },
	{ path: '/stats', component: StatsView }
]

const router = new VueRouter({
	routes
})

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