import * as actionTypes from './actionTypes.js'

const mutations = {
  [actionTypes.FETCH_EXPENSES](state, expenses) {
    state.expenses = expenses
  },
  [actionTypes.ADD_EXPENSE](state, expense) {
    state.expenses.push(expense)
  },
  [actionTypes.UPDATE_EXPENSE](state, updatedExpense) {
    const indexOfExpense = state.expenses.findIndex(expense => expense._id === updatedExpense._id)
    state.expenses.splice(indexOfExpense, 1, updatedExpense)
  },
  [actionTypes.DELETE_EXPENSE](state, id) {
    state.expenses = state.expenses.filter(expense => expense._id !== id)
  }
}

export default mutations
