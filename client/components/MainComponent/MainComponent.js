import ExpenseView from '../ExpenseView/ExpenseView.js'
import AboutView from '../AboutView/AboutView.js'
import template from './template.js'

const routes = [
	{ path: '/about', component: AboutView },
	{ path: '/dash', component: ExpenseView }
]

const router = new VueRouter({
	routes
})

const MainComponent = new Vue({
	el: '#app',
	router,
	template,
	data: {
		theme: 'light',
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