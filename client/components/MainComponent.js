import ExpenseView from './ExpenseView/ExpenseView.js'
import AboutView from './AboutView/AboutView.js'

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
})