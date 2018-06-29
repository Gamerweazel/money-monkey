import ExpenseView from '../ExpenseView/ExpenseView.js'
import AboutView from '../AboutView/AboutView.js'
import StatsView from '../StatsView/StatsView.js'
import template from './template.js'
import api from '../../helpers/api.js'

const routes = [
	{ path: '/about', component: AboutView },
	{ path: '/dash', component: ExpenseView, props: { default: true, expenses: [] } },
	{ path: '/stats', component: StatsView }
]

const router = new VueRouter({
	routes
})

const MainComponent = new Vue({
	el: '#app',
	router,
	template,
	created() {
		api.getExpenses()
			.then(expenses => {
				this.expenses = expenses.reverse()
				this.loading = false
			})
			.catch(e => console.log(e))
	},
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