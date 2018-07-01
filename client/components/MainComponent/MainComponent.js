import template from './template.js'
import api from '../../helpers/api.js'
import router from '../../router/router.js'

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
