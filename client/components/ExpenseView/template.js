const template = `
  <v-content>
    <v-container>
      <v-snackbar
        top
        :color="snackColor"
            :timeout="2000"
            v-model="snackbar"
        >
          {{ snackText }}
        </v-snackbar>

        <h1>{{ message }}</h1>

        <v-form class="ma-5" @keyup.native.enter="saveExpense">
          <v-text-field :class="{'error-textbox': !valid.description}" v-model="description" ref="descriptionRef" placeholder="Description" type="text"></v-text-field>
          <v-text-field :class="{'error-textbox': !valid.amount}"v-model="amount" ref="amountRef" placeholder="Amount" type="text"></v-text-field>
          <input type="number" v-model="quantity">
          <br />
          <br />

          <v-btn color="info" @click="saveExpense">{{ saveButtonText }}</v-btn>

          <v-btn v-if="clearButtonVisible" color="error" @click="clear">Clear</v-btn>

          <v-alert :value="!valid.description" type="error">
            Enter valid description
          </v-alert>
          <v-alert :value="!valid.amount" type="error">
            Enter valid amount
          </v-alert>

        </v-form>

        <h2 class="text-xs-center ma-3">
          Total Expenses
          <v-chip color="green" text-color="white">\$\{{ total }}</v-chip>
        </h2>

        <v-data-table :loading="loading" :no-data-text="loadingText" :headers="headers" :items="expenses" class="elevation-1" hide-actions>
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">
              <v-icon v-if="expenseId === props.item._id">edit</v-icon>
            </td>
            <td class="text-xs-left"><b>{{ props.item.description }}</b></td>
            <td class="text-xs-left"><b>\$\{{ props.item.amount.toFixed(2) }}</b></td>
            <td class="text-xs-left"><b>{{ props.item.quantity }}</b></td>
            <td class="text-xs-left"><b>{{ formatDate(props.item.date) }}</b></td>
            <td>
              <v-tooltip bottom>
                    <span slot="activator">
                      <v-btn outline fab small @click="setEditingId(props.item._id)"><v-icon>edit</v-icon></v-btn>
                    </span>
                    <span>Edit</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <span slot="activator">
                      <v-btn outline fab small color="info" @click="duplicateExpense(props.item._id)"><v-icon>file_copy</v-icon></v-btn>
                    </span>
                    <span>Duplicate</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <span slot="activator">
                      <v-btn outline fab small color="error" @click="setDeletingId(props.item._id)"><v-icon>delete</v-icon></v-btn>
                    </span>
                    <span>Delete</span>
                </v-tooltip>
                <v-dialog :value="deletingId" persistent max-width="300">
                <v-card>
                      <v-card-title class="headline">Are you sure?</v-card-title>
                      <v-card-actions>
                          <v-spacer></v-spacer>
                    <v-btn color="info" @click="setDeletingId(null)">Cancel</v-btn>
                    <v-btn color="error" @click="deleteExpense">Confirm</v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </td>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
`
export default template
