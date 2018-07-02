const getters = {
  inRange: state => (startUTC, endUTC) =>
    state.expenses.filter(expense => {
      const expenseUTC = moment(expense.date).unix()

      console.log(expenseUTC, startUTC, endUTC)
      return expenseUTC >= startUTC && expenseUTC <= endUTC
    })
}

export default getters
