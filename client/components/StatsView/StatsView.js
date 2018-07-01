const StatsView = Vue.component('stats-view', {
  data: () => ({
    startPicker: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    endPicker: moment().format('YYYY-MM-DD'),
  }),
  computed: {
    rangedExpenses() {

    }
  },
  template: `
    <v-content>
      <v-container>
        <v-layout row justify-space-around>
          <h1>Start Date</h1>
          <h1>End Date</h1>
        </v-layout>
        <v-layout row justify-space-around>
          <v-date-picker v-model="startPicker"></v-date-picker>
          <v-date-picker v-model="endPicker"></v-date-picker>
        </v-layout>	
      </v-container>
    </v-content>
  `
})

export default StatsView
