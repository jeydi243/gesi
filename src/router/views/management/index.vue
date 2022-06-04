<template>
	<div>
		<div class="flex border-b border-gray-200 mb-2">
			<button v-for="(tab, indexTab) in tabsGestion" :key="indexTab" class="btn-tab" :class="{ 'btn-tab-active': tab.current }" @click="changeTab(indexTab)">{{ filters.firstUpper(tab.name) }}</button>
		</div>
		<div class="contentTab">
			<Transition name="fadeSlideX" mode="out-in">
				<!-- <KeepAlive> -->
				<component :is="currentComponent"></component>
				<!-- </KeepAlive> -->
			</Transition>
		</div>
	</div>
</template>

<script>
import course from "@/router/views/management/course.vue";
import academique from "@/router/views/management/academique.vue";
import filiere from "@/router/views/management/filiere.vue";
import documents from "@/router/views/management/documents.vue";
import employees from "@/router/views/management/employees/index.vue";
export default {
	name: "index-gestion",
	components: {
		academique,
		course,
		filiere,
		documents, employees
	},
	data() {
		return {
			isloading: "",
			tabsGestion: [
				{ name: "academique", current: false },
				{ name: "course", current: false },
				{ name: "filiere", current: false },
				{ name: "documents", current: false },
				{ name: "employees", current: true },
			],
		};
	},
	computed: {
		currentComponent() {
			return this.tabsGestion.find((tab) => tab.current).name.toLowerCase();
		},
	},
	methods: {
		changeTab(indexTab) {
			var currentTrue = this.tabsGestion.findIndex((tab) => tab.current == true);
			this.tabsGestion[currentTrue].current = false;
			this.tabsGestion[indexTab].current = true;
		},
	},
};
</script>