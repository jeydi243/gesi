<template>
	<div class="home">
		<v-toolbar color="cyan" dense flat dark>
			<v-app-bar-nav-icon></v-app-bar-nav-icon>

			<v-toolbar-title>Etudiants</v-toolbar-title>

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
			<v-tab-item v-for="(item, index) in items" :key="index">
				<keep-alive> 
						<component :is="getcurrentComponent(item)"> </component>
				</keep-alive>
			</v-tab-item>
		</v-tabs-items>
	</div>
</template>
<script>

 import annuaire from "@/components/Etudiants/annuaire.vue"
 import inscription from "@/components/Etudiants/inscription.vue"

 import presences from "@/components/Etudiants/presences.vue"
 import parcours from "@/components/Etudiants/parcours.vue"
 import gestionstages from "@/components/Etudiants/gestionstages.vue"

	export default{
		name: "etudiants",
		components: {
			annuaire,inscription,presences,parcours,gestionstages,
		},
		data (){
			return {
				tab: null,
				currentComponent: "annuaire",
				items :["annuaire","presences","inscription","parcours","gestionstages"],
			}
		},
		methods:{
			getcurrentComponent(item){
				return item;
			}
		}
	}

</script>
<style scoped>

</style>