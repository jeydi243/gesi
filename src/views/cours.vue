<template>
	<div class="home">
		<v-toolbar color="cyan" dense flat dark>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title>Cours</v-toolbar-title>

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

					<v-tab v-for="(item,index) in items2" :key="index">
						{{ item }}
					</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(item, index) in items" :key="index">
				<v-card flat>
					<v-card-text v-text="text"></v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
	export default {
		name: 'cours',
	}
</script>