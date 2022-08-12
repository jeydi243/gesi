<template>
	<div>
		<div class="flex border-b border-gray-200 mb-2 select-none">
			<a v-for="(tab, indexTab) in tabsGestion" :key="indexTab" class="btn-tab" :class="{ 'btn-tab-active': tab.current }" @click="changeTab(indexTab)">{{ filters.firstUpper(tab.name) }}</a>
		</div>
		<div class="contentTab h-full w-full">
			<router-view v-slot="{ Component, route }">
				<Transition name="fadeSlideX" mode="out-in">
					<div :key="route.name">
						<component :is="Component" />
					</div>
				</Transition>
			</router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: "index-management",
	data() {
		return {
			isloading: "",
			tabsGestion: [
				{ name: "academique", current: false },
				{ name: "courses", current: false },
				{ name: "filieres", current: false },
				{ name: "documents", current: false },
				{ name: "employees", current: true },
			],
		};
	},
	computed: {
		currentTab() {
			return this.tabsGestion.find((tab) => tab.current).name.toLowerCase();
		},
	},
	watch: {
		currentTab(newval, oldval) {
			if (newval != oldval && newval != "employees") {
				this.goto(`${newval}-index`)
			} else {
				this.goto(`${newval}-list`)
			}
		}
	},
	mounted() {
		if (this.currentTab == "employees") {
			this.goto(`${this.currentTab}-list`)
		} else {
			this.goto(`${this.currentTab}-index`)
		}
	},
	methods: {
		changeTab(indexTab) {
			var currentTrue = this.tabsGestion.findIndex((tab) => tab.current == true);
			this.tabsGestion[currentTrue].current = false;
			this.tabsGestion[indexTab].current = true;
		},
		goto(name) {
			this.$router.replace({ name: name })
		}
	},
};
</script>