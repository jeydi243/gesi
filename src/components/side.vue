<template>
	<div class="flex flex-col justify-center items-center overflow-hidden text-gray-400 select-none">
		<!-- {{ getRootName }} -->
		<div class="flex flex-col place-items-center w-full mt-1">
			<router-link :to="item.to" @hover="item.mouseHover = !item.mouseHover" v-for="(item, index) in listSideMenus" :key="index" class="transition-colors hover:border-l-2 hover:border-l-green-500 ease-out-in duration-700 flex items-center w-full h-9 px-3 mt-2 hover:text-white hover:font-bold" :class="{ 'bg-green-500 bg-opacity-50 border-l-2 border-l-green-500 font-bold text-white': item.active }" href="#">
				<box-icon type="regular" :name="item.icon" color="white"></box-icon>

				<span class="ml-2 text-sm font-medium">{{ item.text }}</span>
			</router-link>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { BeakerIcon } from "@heroicons/vue/solid";
export default {
	name: "sideLeft",
	data() {
		return {
			currentActive: 0,
			canAnimate: false,
		};
	},
	computed: {
		...mapGetters({ listSideMenus: "getListSideMenus", getRootName: "getRootName" }),
	},
	watch: {
		canAnimate(ol, nw) {
			console.log(ol, nw);
		},
	},
	methods: {
		...mapActions(["changeLayout"]),
	},
};
</script>

<style lang="scss" scoped>
</style>