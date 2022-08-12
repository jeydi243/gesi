<template>
	<header
			class="sticky top-0 right-0 z-10 flex w-full h-[6%] bg-white text-black select-none items-center justify-between pr-10 pl-5 border-t-2 border-t-gray-300">
		<ArrowLeftIcon class="flex h-5 w-5 text-green-600 cursor-pointer" @click="goto" />
		<nav class="rounded-md w-full">
			<ol class="list-reset flex">
				<li><a href="#" class="text-blue-600 hover:text-blue-700">Home</a></li>
				<li><span class="text-gray-500 mx-2">/</span></li>
				<li><a href="#" class="text-blue-600 hover:text-blue-700">Library</a></li>
				<li><span class="text-gray-500 mx-2">/</span></li>
				<li class="text-gray-500">Data</li>
			</ol>
		</nav>
		<div class="relative row space-x-5">
			<!-- Dropdown toggle button -->
			<button id="toggle-dropdown" class="btn-header" data-bs-toggle="dropdown" aria-expanded="false">
				<div class="avatar rounded-lg overflow-hidden">
					<img
						 src="https://images.generated.photos/PP2ck5OaSvRBYQwh1ZDCsEhBQ4WxLWlZNs7nKhaJIWA/rs:fit:64:64/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NjIyMTIwLmpwZw.jpg"
						 class="object-fill" />
				</div>
				<span class="ml-2">Kadiongo Ilunga</span>
				<svg
					 class="w-5 h-5 text-gray-800 text-center"
					 xmlns="http://www.w3.org/2000/svg"
					 viewBox="0 0 20 20"
					 fill="currentColor">
					<path
						  fill-rule="evenodd"
						  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						  clip-rule="evenodd" />
				</svg>
			</button>
			<ul class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
				aria-labelledby="dropdownMenuButton1">
				<li>
					<a
					   class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
					   href="#" @click="goto('profile')">
						Profile
					</a>
				</li>
				<li>
					<a
					   class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
					   href="#" @click="goto('index-settings')">Settings</a>
				</li>
				<hr class="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
				<li>
					<a
					   class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-red-700 hover:bg-red-50"
					   href="#" @click="goto('login')">Sign Out</a>
				</li>
			</ul>
		</div>
	</header>
</template>

<script setup>
import { mapActions } from "pinia"
import { useAuthentication } from "@/store/authentication"
import { ArrowLeftIcon } from "@heroicons/vue/solid"
import { ref, computed } from "vue"
import { goto } from "@/utils/utils"

const dropdown = ref(null)

mapActions(useAuthentication,["logout"])
</script>

<style lang="scss" scoped>
</style>
