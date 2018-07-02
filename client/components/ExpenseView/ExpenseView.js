import data from './data.js'
import template from './template.js'
import api from '../../helpers/api.js'

const ExpenseView = Vue.component('expense-view', {
	data,
	template,
	watch: {
		description(val) {
			if (val !== '')
				this.valid.description = this.validDescription()
		},
		amount(val) {
			if (val !== '')
				this.valid.amount = this.validAmount()
		},
	},
	computed: {
		expenses() {
			return this.$store.state.expenses
		},
		total() {
			// functional way
			return this.expenses
				.reduce((total, expense) =>
					total + expense.amount * expense.quantity, 0)
				.toLocaleString()
		},
		saveButtonText() {
			return this.expenseId === null ? 'Add Expense' : 'Update Expense'
		},
		clearButtonVisible() {
			if (this.description !== '' || this.amount !== '' || this.quantity !== '1' || this.expenseId !== null)
				return true
			else
				return false
		},
		loadingText() {
			return this.loading ? 'Loading Expenses' : 'No Expenses ;('
		}
	},
	methods: {
		formatDate(date) {
			return moment(date).format('MMMM Do, YYYY')
		},
		showSnack(message, color) {
			this.snackColor = color
			this.snackText = message
			this.snackbar = true
		},
		validAmount() {
			return this.amount !== '' && /^[^,]([0-9]{0,3})(,?([0-9]){3})*(\.[0-9]{0,2})?$/.test(this.amount)
		},
		validDescription() {
			return this.description !== ''
		},
		setEditingId(id) {
			this.expenseId = id
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
			const expense = this.expenses[indexOfExpense]

			this.description = expense.description
			this.amount = expense.amount.toLocaleString()
			this.quantity = expense.quantity

		},
		setDeletingId(id) {
			this.deletingId = id
		},
		isValid() {
			this.valid = {
				description: this.validDescription(),
				amount: this.validAmount(),
			}

			for(const key in this.valid) {
				if (!this.valid[key]) {
					return false
				}
			}

			return true
		},
		saveExpense() {
			this.description = this.description.trim()
			this.amount = this.amount.trim()
			if (this.isValid()) {
				if (this.expenseId !== null) {
					console.log('updating')
					// we are editing an expense
					this.updateExpense(this.expenseId)

				} else {
					console.log('adding')
					// we are adding an expense
					this.addExpense()

				}
				this.$refs.descriptionRef.focus()
			}
		},
		duplicateExpense(id) {
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
			const expense = this.expenses[indexOfExpense]
			
			api.addExpense({ ...expense })
				.then(expense => this.expenses.unshift(expense))
				.then(() => this.showSnack('Duplicated Expense', 'green'))
				.catch(e => this.showSnack('Failed to duplicate', 'red'))
		},
		addExpense() {
			const expense = {
				description: this.description,
				amount: Number(this.amount.replace(/,/g, '')),
				quantity: Number(this.quantity),
			}
			api.addExpense(expense)
				.then(expense => this.expenses.unshift(expense))
				.then(this.clear)
				.then(() => this.showSnack('Added Expense', 'green'))
				.catch(e => this.showSnack('Failed to add', 'red'))
		},
		updateExpense(id) {
			const updatedExpense = {
				_id: id,
				description: this.description,
				amount: Number(this.amount.replace(/,/g, '')),
				quantity: Number(this.quantity),
			}

			api.updateExpense(updatedExpense)
				.then(expense => {
					const indexOfExpense = this.expenses.findIndex(expense => expense._id === id)
					this.expenses.splice(indexOfExpense, 1, expense)
					this.expenseId = null
				})
				.then(this.clear)
				.then(() => this.showSnack('Updated Expense', 'green'))
				.catch(e => this.showSnack('Failed to update', 'red'))
		},
		deleteExpense() {
			const indexOfExpense = this.expenses.findIndex(expense => expense._id === this.deletingId)
			console.log(this.expenses[indexOfExpense].description)
			api.deleteExpense(this.deletingId)
				.then(() => {
					this.expenses = this.expenses.filter(expense => expense._id !== this.deletingId)
					this.deletingId = null
				})
				.then(() => this.showSnack('Deleted Expense', 'green'))
				.catch(e => this.showSnack('Failed to delete', 'red'))
		},
		clear() {
			this.description = ''
			this.amount = ''
			this.quantity = '1'
			this.expenseId = null
			this.valid.description = true
			this.valid.amount = true
		}
	}
})

export default ExpenseView












