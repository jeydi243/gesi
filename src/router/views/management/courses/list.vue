<template>
	<div class="row w-full justify-end mb-2">
		<button @click="goto('courses-add')" class="btn-primary"><box-icon name="plus" color="white"></box-icon>Add Course</button>
	</div>
	<div class="grid grid-cols-3 gap-2 justify-center items-center">
		<TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
			<!-- <div class="grid grid-cols-3 gap-2 justify-center items-center"> -->
			<article v-for="(item, index) in 10" :key="index" :data-index="index" class="course-card">
				<div class="bg-yellow-50 h-[25%] w-full relative">
					<button class="absolute top-2 right-3 z-4 rounded-full w-10 h-10 items-center" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light">
						<box-icon name="dots-vertical-rounded" size="sm" color="white"></box-icon>
					</button>
					<UseImage src="https://place.dog/300/200" class="w-full">
						<template #loading>
							<div class="w-full h-full">
								<box-icon name="error-alt"></box-icon>
							</div>
						</template>

						<template #error> <div class="w-full h-full">Error</div> </template>
					</UseImage>
					<!-- <rating class="" v-model="rating"></rating> -->
					<!-- <img @click="goto('courses-details', index)" class="h-full w-full object-cover hover:scale-10 transition duration-500 ease-in-out" src="https://picsum.photos/500/300/?random" /> -->
					<div class="w-full m-1 h-8 backdrop-blur-sm bg-white/30 z-4 absolute bottom-0 left-0 rounded-md"></div>
				</div>

				<header class="flex items-center justify-between p-2 h-[10%] w-full">
					<h1 class="text-lg row items-center">
						<!-- <UsersIcon class="h-5 w-5 text-blue-700 mr-1" /> -->
						<span class="no-underline text-sm hover:cursor-pointer text-blue-700 italic">{{ rand(20) }} Leçons</span>
					</h1>
					<p class="text-grey-darker text-sm">{{ chance.date({ string: true }) }}</p>
				</header>
				<div class="flex items-center justify-between p-2 h-[30%] w-full text-base">
					{{ chance.sentence() }}
				</div>
				<footer class="flex items-center justify-start leading-none p-2 h-[20%] w-full mt-2">
					<img class="block avatar rounded-full" :src="`https://mdbcdn.b-cdn.net/img/new/avatars/${rand(20)}.webp`" />
					<router-link :to="{ name: 'teachers-details' }" class="flex cursor-pointer items-center no-underline hover:underline text-black link">
						<p class="ml-2 text-sm text-black">By {{ chance.name() }}</p>
					</router-link>

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
	import { ref } from "vue"
	import { UseImage } from "@vueuse/components"
	import { onBeforeEnter, onEnter, onLeave, goto, chance } from "@/utils/utils"


	const rating = ref()
	function rand(max) {
		return Math.floor(Math.random() * max)
	}
</script>

<style lang="scss" scoped></style>
