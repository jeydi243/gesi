<template>
	<div class="home">
		<v-toolbar dense flat>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title>Gestion</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-magnify</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-dots-vertical</v-icon>
			</v-btn>

			<template v-slot:extension>
				<v-tabs v-model="tab" align-with-title background-color="transparent">
					<v-tabs-slider color="yellow"></v-tabs-slider>

					<v-tab v-for="(item,index) in items" :key="index">
						{{ item }}
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(item, index) in items" :key="index" transition="scroll-y-transition">
				<v-card flat>
					<v-card-text v-text="text"></v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>

	export default {
		name: 'gestion',
		data(){
			return {
				tab:null,
				items :["Minerval","Locaux","Materiels","Payes","Bibliotheque","Depenses"],
				text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			}
		}
	}
</script>