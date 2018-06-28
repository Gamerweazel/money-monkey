import ExpenseView from './ExpenseView/ExpenseView.js'

const MainComponent = new Vue({
	el: '#app',
	data: {
		message: 'Hello I am a component!'
	},
	template: `
		<expense-view></expense-view>
	`
})