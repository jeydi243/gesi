<template>
	<div class="grid grid-cols-3 gap-2 justify-center items-center">
		<TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
			<!-- <div class="grid grid-cols-3 gap-2 justify-center items-center"> -->
			<article v-for="(item, index) in 10" :key="index" :data-index="index" class="course-card">
				<div class="bg-yellow-50 h-[40%] w-full" @click="goto('courses-details', index)">
					<img class="h-full w-full object-cover hover:scale-110 transition duration-300 ease-in-out" src="https://picsum.photos/600/400/?random" />
				</div>

				<header class="flex items-center justify-between p-2 h-[10%] w-full">
					<h1 class="text-lg">
						<a class="no-underline hover:underline text-black" href="#"></a>
					</h1>
					<p class="text-grey-darker text-sm">11/1/19</p>
				</header>
				<div class="flex items-center justify-between p-2 h-[30%] w-full text-base">
					{{ chance.sentence() }}
				</div>
				<footer class="flex items-center justify-between leading-none p-2 h-[20%] w-full mt-2">
					<a class="flex items-center no-underline hover:underline text-black" href="#">
						<img alt="Placeholder" class="block rounded-full" src="https://picsum.photos/32/32/?random" />
						<p class="ml-2 text-sm">By {{ chance.name() }}</p>
					</a>
					<a class="no-underline text-grey-darker hover:text-red-dark" href="#">
						<span class="hidden">Like</span>
						<i class="fa fa-heart"></i>
					</a>
				</footer>
			</article>
			<!-- </div> -->
		</TransitionGroup>
	</div>
</template>

<script setup>
	import * as Chance from "chance"
	import { mapActions } from "pinia"
	import { useRouter, useRoute } from "vue-router"
	import { onBeforeEnter, onEnter, onLeave, goto, chance } from "@/utils/utils"
	const router = useRouter()
</script>

<style lang="scss" scoped></style>
