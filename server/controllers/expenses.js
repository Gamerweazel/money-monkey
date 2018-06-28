const moment = require('moment')
const Expense = require('../models/expenses')

module.exports = {
	listExpenses: (req, res, next) => {
		Expense.find(req.query)
			.then(expenses => res.json(expenses))
			.catch(e => {
				req.error = e
				next()
			})
	},
	getExpense: (req, res, next) => {
		Expense.findById(req.params.id)
			.then(expense => {
				if (expense === null) {
					res.status(404).send()
					return
				}
				res.json(expense)
			})
			.catch(e => {
				req.error = e
				next()
			})
	},
	createExpense: (req, res, next) => {
		Expense.create({
			description: req.body.description,
			amount: req.body.amount,
			quantity: req.body.quantity
		})
			.then(expense => res.status(201).json(expense))
			.catch(e => {
				req.error = e
				next()
			})
	},
	updateExpense: (req, res, next) => {
		Expense.findById(req.params.id)
			.then(expense => {
				if (expense === null) {
					res.status(404).send()
					return
				}
				expense.description = req.body.description
				expense.amount = req.body.amount
				expense.quantity = req.body.quantity
				return expense.save()
			})
			.then(expense => res.json(expense))
			.catch(e => {
				req.error = e
				next()
			})

	},
	deleteExpense: (req, res, next) => {
		Expense.findByIdAndRemove(req.params.id)
			.then(() => res.status(204).send())
			.catch(e => {
				req.error = e
				next()
			})
	},
}














