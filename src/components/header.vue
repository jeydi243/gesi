<template>
	<header class="flex w-full h-[50px] bg-white text-black items-center justify-between pr-10 pl-5 border-t-2 border-t-gray-300">
		<ArrowLeftIcon class="flex h-5 w-5 text-green-600 cursor-pointer" @click="back" />
		<div class="relative flex flex-row space-x-5">
			<!-- Dropdown toggle button -->
			<button @click="dropdown = !dropdown" id="toggle-dropdown" class="relative items-center z-20 text-gray-700 bg-white border border-transparent rounded-md focus:border-transparent focus:ring-opacity-40 focus:ring-transparent focus:outline-none flex flex-row">
				<div class="avatar rounded-full">
					<img src="https://images.generated.photos/PP2ck5OaSvRBYQwh1ZDCsEhBQ4WxLWlZNs7nKhaJIWA/rs:fit:64:64/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjIyMTIwLmpwZw.jpg" class="object-cover" />
				</div>
				<span class="ml-2">Kadiongo Ilunga</span>
				<svg class="w-5 h-5 text-gray-800 text-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
				</svg>
			</button>

			<!-- Dropdown menu -->
			<div id="dropdown" class="dropdown" v-if="dropdown">
				<span href="#" class="dropdown-item" @click="goto('profile')">Profile</span>
				<span href="#" class="dropdown-item" @click="goto('index-settings')">Settings</span>
				<span class="dropdown-separator"></span>
				<span href="#" class="dropdown-item-sensible" @click="goto('login')">Sign Out</span>
			</div>
		</div>
	</header>
</template>

<script>
import { mapActions } from "vuex";
import { ArrowLeftIcon } from "@heroicons/vue/solid";
export default {
	name: "Header",
	components: {
		ArrowLeftIcon,
	},
	data() {
		return {
			dropdown: false,
		};
	},
	created() {
		window.onclick = (e) => {
			if (e.target.id !== "toggle-dropdown" && this.dropdown) {
				this.dropdown = false;
			}
		};
	},
	methods: {
		...mapActions("authentication", ["logout"]),
		goto(name) {
			if (name === "login") {
				// this.logout();
			}
			this.dropdown = !this.dropdown;
			console.log(this.dropdown);
			this.$router.push({ name });
		},
		back() {
			this.$router.back();
		},
	},
};
</script>

<style lang="scss" scoped>
</style>