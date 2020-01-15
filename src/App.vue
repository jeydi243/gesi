<template>
<transition name="scale-y">
	<v-app>
		<v-system-bar window app>
			<v-spacer></v-spacer>
			<v-icon @click="minus" flat>mdi-minus</v-icon>
			<v-icon @click="maximise">mdi-checkbox-blank-outline</v-icon>
			<v-icon @click="closer">mdi-close</v-icon>
		</v-system-bar>

		<v-navigation-drawer dark app color="#001B48" center>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="title">
						GESI
					</v-list-item-title>
					<v-list-item-subtitle>
						subtext
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense nav>
				<v-list-item v-for="(item,index) in items" :key="index" link @click="sebebe(item.title)">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>

		</v-navigation-drawer>

		<v-content>
			<v-container fluid>
				<transition name="fade"  mode="out-in" type="transition" appear> 
					<keep-alive> 
						<router-view ></router-view>
					</keep-alive>
				 </transition> 
			</v-container>
		</v-content>

		<v-footer app></v-footer>
		
	</v-app>
</transition>
</template>

<script>
	export default {
		name: 'App',
		methods: {
			minus() {

			},
			closer() {

			},
			maximise() {

			},
			sebebe(titre) {
				this.titre = titre
				this.$router.push(titre.toLowerCase());
			}
		},
		data: () => ({
			items: [{
					title: 'Etudiants',
					icon: 'mdi-view-dashboard'
				},
				{
					title: 'Professeurs',
					icon: 'mdi-image'
				},
				{
					title: 'Gestion',
					icon: 'mdi-help-box'
				},
				{
					title: 'Cours',
					icon: 'mdi-help-box'
				},
			],
			right: null,
			tab: null,
			items2: [
				'web', 'shopping', 'videos', 'images', 'news',
			],
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',

		}),
	};
</script>
<style scoped>
	.fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity .3s;
    }
    /* .fade-leave{
        /* opacity: 1; 
    } */
    .fade-leave-active{
        transition: opacity .2s;
        opacity: 0;
    }
</style>