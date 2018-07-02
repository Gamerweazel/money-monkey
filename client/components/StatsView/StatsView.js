const StatsView = Vue.component('stats-view', {
  data: () => ({
    startPicker: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    endPicker: moment().add(1, 'day').format('YYYY-MM-DD'),
  }),
  computed: {
    expenses() {
      const startUTC = moment(this.startPicker).unix()
      const endUTC = moment(this.endPicker).unix()
      return this.$store.getters.inRange(startUTC, endUTC)
    },
    total() {
      return this.expenses.reduce((acc, curr) => acc + curr.amount, 0)
    },
    average() {
      return this.total / this.expenses.length
    },
    minimum() {
      return this.expenses.sort((a, b) => {
        if (a.amount < b.amount) return -1
        if (a.amount > b.amount) return 1
        else return 0
      })[0].amount
    },
    maximum() {
      return this.expenses.sort((a, b) => {
        if (a.amount > b.amount) return -1
        if (a.amount < b.amount) return 1
        else return 0
      })[0].amount
    },
    items() {
      return [{
          text: 'TOTAL',
          value: this.total
        },
        {
          text: 'Average',
          value: this.average
        },
        {
          text: 'Minimum',
          value: this.minimum
        },
        {
          text: 'Maximum',
          value: this.maximum
        }
      ]
    },
  },
  template: `
    <v-content>
      <v-container>
        <v-layout row text-xs-center>
          <v-container>
            <h1>From</h1>
            <v-date-picker v-model="startPicker"></v-date-picker>
          </v-container>
          <v-container>
            <h1>To</h1>
            <v-date-picker v-model="endPicker"></v-date-picker>
          </v-container>
        </v-layout>
        <v-container>
          <v-layout row justify-center>
            <h1>Statistics</h1>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs8>
              <div v-if="expenses.length">
                <v-data-table no-data-text="No data for range" :items="items" class="elevation-1" hide-actions hide-headers>
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left"><b>{{ props.item.text }}</b></td>
                    <td class="text-xs-center"><v-chip>\$\{{ props.item.value.toFixed(2) }}</v-chip></td>
                  </template>
                </v-data-table>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-container>
    </v-content>
  `
})

export default StatsView
