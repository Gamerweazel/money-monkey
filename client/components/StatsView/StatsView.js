const StatsView = Vue.component('stats-view', {
  data: () => ({
    startPicker: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    endPicker: moment().add(1, 'day').format('YYYY-MM-DD'),
  }),
  computed: {
    expenses() {
      const startUTC = moment(this.startPicker).unix()
      const endUTC = moment(this.endPicker).unix()
      console.log(startUTC, endUTC)
      return this.$store.getters.inRange(startUTC, endUTC)
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
        {{ expenses }}
        </v-layout>
      </v-container>
    </v-content>
  `
})

export default StatsView
