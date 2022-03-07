<template>
	<div>
		<div class="flex border-b border-gray-200 mb-2">
			<button v-for="(tab,index) in tabsGestion" :key="index" class="h-10 px-4 py-2 -mb-px text-sm transition-border ease-in-out hover:border-green-500 duration-700 text-center border-b-2 sm:text-base whitespace-nowrap focus:outline-none" :class="{ 'text-green-600 border-green-500 bg-green-50 rounded-tl rounded-tr': tab.current }" @click="changeTab(index)">{{ tab.name }}</button>
		</div>

		<div class="contentTab">
			<transition>
				<component :is="currentComponent"></component>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "index-gestion",
	components: {
		course: () => import(/* webpackChunkName: "gestion-course" */ "./course.vue"),
		academique: () => import(/* webpackChunkName: "gestion-course" */ "./academique.vue"),
	},
	data() {
		return {
			isloading: "",
			comp: {
				course: () => import(/* webpackChunkName: "gestion-course" */ "./course.vue"),
				academique: () => import(/* webpackChunkName: "gestion-course" */ "./academique.vue"),
			},
			tabsGestion: [
				{ name: "Academique", current: true },
				{ name: "Cours", current: false },
			],
		};
	},
	computed: {
		currentComponent() {
			return comp[this.tabsGestion.find((tab) => tab.current).name.toLowerCase()];
		},
	},
	methods: {
		changeTab(index) {
			this.tabsGestion.forEach((tab, i) => {
				tab.current = false;
				if (i == index) {
					tab.current = true;
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>