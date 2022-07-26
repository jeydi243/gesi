<template>
	<div class="relative left-0 top-0 flex flex-col justify-center items-center overflow-hidden text-gray-400 select-none">
		<!-- {{ getRootName }} -->
		<div class="flex flex-col place-items-center w-full mt-1">
			<TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
				<router-link :to="item.to" @hover="item.mouseHover = !item.mouseHover" v-for="(item, index) in listSideMenus" :data-index="index" :key="index" class="router-link"
							 :class="{ 'router-link-active': item.active }">
					<box-icon type="regular" :name="item.icon" color="white"></box-icon>

					<span class="ml-2 text-sm font-medium">{{ item.text }}</span>
				</router-link>
			</TransitionGroup>
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
		onEnter(el, done) {
			gsap.to(el, {
				opacity: 1,
				height: '1.6em',
				scaleY: 0,
				delay: el.dataset.index * 0.15,
				onComplete: done
			})
		},
		onLeave(el, done) {
			gsap.to(el, {
				opacity: 1,
				height: '1.6em',
				delay: el.dataset.index * 0.15,
				onComplete: done
			})
		}, onBeforeEnter(el, done) {
			gsap.to(el, {
				opacity: 0,
				x: -20,
				scaleY: 0.8,
				delay: el.dataset.index * 0.25,
				onComplete: done
			})
		},
	},
};
</script>

<style lang="scss" scoped>
</style>