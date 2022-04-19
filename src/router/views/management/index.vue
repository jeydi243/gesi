<template>
	<div>
		<div class="flex border-b border-gray-200 mb-2">
			<button v-for="(tab,index) in tabsGestion" :key="index" class="h-10 px-4 py-2 -mb-px text-sm transition-border ease-in-out hover:border-green-500 duration-700 text-center border-b-2 sm:text-base whitespace-nowrap focus:outline-none" :class="{ 'text-green-600 border-green-500 bg-green-50 rounded-tl rounded-tr': tab.current }" @click="changeTab(index)">{{ filters.firstUpper(tab.name) }}</button>
		</div>

		<div class="contentTab">
			<Transition name="fadeSlideX">
				<KeepAlive>
					<component :is="currentComponent"></component>
				</KeepAlive>
			</Transition>
		</div>
	</div>
</template>

<script>
import course from "@/router/views/management/course.vue";
import academique from "@/router/views/management/academique.vue";
import filiere from "@/router/views/management/filiere.vue";
import documents from "@/router/views/management/documents.vue";
export default {
	name: "index-gestion",
	components: {
		course,
		academique,
		documents,
		filiere,
	},
	data() {
		return {
			isloading: "",
			tabsGestion: [
				{ name: "academique", current: false },
				{ name: "course", current: false },
				{ name: "filiere", current: false },
				{ name: "documents", current: true },
			],
		};
	},
	computed: {
		currentComponent() {
			return this.tabsGestion.find((tab) => tab.current).name.toLowerCase();
			// return this.comp[this.tabsGestion.find((tab) => tab.current).name.toLowerCase()];
		},
	},
	methods: {
		changeTab(index) {
			var currentTrue = this.tabsGestion.findIndex((tab) => tab.current);
			this.tabsGestion[currentTrue].current = false;

			this.tabsGestion[index].current = true;
		},
	},
};
</script>

<style lang="scss" scoped>
</style>