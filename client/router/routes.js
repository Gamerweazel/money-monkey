import ExpenseView from '../components/ExpenseView/ExpenseView.js'
import AboutView from '../components/AboutView/AboutView.js'
import StatsView from '../components/StatsView/StatsView.js'

const routes = [
	{ path: '/about', component: AboutView },
	{ path: '/dash', component: ExpenseView },
	{ path: '/stats', component: StatsView }
]

export default routes