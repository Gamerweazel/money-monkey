import mutations from './mutations.js'
import actions from './actions.js'
import {
  FETCH_EXPENSES,
} from './actionTypes.js'

const store = new Vuex.Store({
  state: {
    expenses: []
  },
  mutations,
  actions,
})

store.dispatch(FETCH_EXPENSES)

export default store
