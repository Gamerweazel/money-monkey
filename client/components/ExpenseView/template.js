const template = `
	<v-app :dark="dark">

				<v-toolbar app>
					<v-toolbar-side-icon>
						<v-avatar>
							<img :class="{inverted: theme === 'dark'}" width="100" height="100" src="https://cdn4.iconfinder.com/data/icons/hana-emojis-monkey-edition-glyph/100/monkey_glyph-22-512.png" alt="avatar">
						</v-avatar>
					</v-toolbar-side-icon>
					<v-spacer></v-spacer>
					<h4>Theme:</h4>
					<v-chip color="white" @click="setTheme('light')"></v-chip>
					<v-chip color="black" @click="setTheme('dark')"></v-chip>
					<!--
					<v-chip color="green" @click="setTheme('green')"></v-chip>
					<v-chip color="red" @click="setTheme('red')"></v-chip>
					-->
				</v-toolbar>

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
								<td class="text-xs-left"><b>{{ props.item.date }}</b></td>
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

			</v-app>
`

export default template