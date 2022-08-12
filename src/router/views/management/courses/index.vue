<template>
	<div class="">
		<div class="container px-4 py-4 mx-auto">
			<router-view v-slot="{ Component }">
				<Transition name="fadeSlideX" mode="out-in">
					<component :is="Component" />
				</Transition>
			</router-view>
		</div>
	</div>
</template>

<script >
import { gsap } from "gsap";
import { mapState } from "pinia";
import * as Chance from "chance"
const chance = new Chance()
export default {
	name: "index-course",
	data() {
		return { chance };
	},
	computed: {
		...mapState("gestion", ["getCourses"]),
	},
	methods: {
		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				duration: 1,
				delay: el.dataset.index * 0.25,
				x: 0,
				onComplete: done
			})
		},
		onBeforeEnter(el, done) {
			gsap.to(el, {
				opacity: 0,
				x: -20,
				delay: el.dataset.index * 0.25,
				onComplete: done
			})
		},
		onLeave(el, done) {
			gsap.to(el, {
				opacity: 0,
				delay: el.dataset.index * 0.25,
				duration: 1,
				y: -40,
				onComplete: done
			})
		},
		async goto(name, id = "") {
			await this.$router.push({ name, params: { id } })
		},
	},
};
</script>

<style lang="scss" scoped>
</style>