const template = `
		<v-app :dark="dark">
			<v-toolbar app>
				<v-toolbar-side-icon>
					<v-avatar>
						<img :class="{inverted: theme === 'dark'}" width="100" height="100" src="https://cdn4.iconfinder.com/data/icons/hana-emojis-monkey-edition-glyph/100/monkey_glyph-22-512.png" alt="avatar">
					</v-avatar>
				</v-toolbar-side-icon>
				<router-link to="/dash">Home</router-link>
				<router-link to="/about">About Us</router-link>
				<v-spacer></v-spacer>
				<h4>Theme:</h4>
				<v-chip color="white" @click="setTheme('light')"></v-chip>
				<v-chip color="black" @click="setTheme('dark')"></v-chip>
			</v-toolbar>
			<router-view></router-view>
		</v-app>
`

export default template