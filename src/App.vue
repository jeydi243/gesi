<template>
	<div id="app" class="h-screen w-screen">
		<div class="row h-full w-full relative" v-bind="$attrs">
			<SideBar class="flex w-[15%] h-full bg-gray-900 relative" v-if="isMain" />

			<main class="col h-full relative bg-gray-100 overflow-auto" :class="{ 'w-full': !isMain, 'w-[85%]': isMain }">
				<MyHeader v-if="isMain" />
				<!-- {{ $route.path }} -->
				<BreadCrumbs v-if="showBraedCrumbs && isMain" />
				<div class="h-[90%] w-full bg-gray-100 px-6 py-6 overflow-auto">
					<router-view v-slot="{ Component }">
						<Transition name="fadeSlideX" mode="out-in">
							<component :is="Component" />
						</Transition>
					</router-view>
				</div>
				<Footer v-if="isMain" />
			</main>
		</div>
	</div>
</template>
<script setup>
	import Footer from "@/components/footer"
	import MyHeader from "@/components/myheader"
	import SideBar from "@/components/side"
	import BreadCrumbs from "@/components/breadcrumbs"
	import { useConfig } from "@/store/config"
	import { ref, onMounted, computed } from "vue"
	import { useIpcRendererOn } from "@vueuse/electron"

	const store = useConfig()
	const layout = computed(() => store.layout)
	const isMain = computed(() => store.layout != "auth")
	let showBraedCrumbs = ref(false)
	useIpcRendererOn("finish_load", async (event, ...args) => {
		try {
			await store.init()
		} catch (er) {
			console.log("Impossible d'initier le store", er)
		}
	})

	onMounted(() => {
		store
			.init()
			.then(() => {
				console.info("%c[STORE] Ok", "color: #0080ff; font-weight: bold;")
			})
			.catch((er) => {
				console.log("Impossible d'initier le store", er)
			})
	})
</script>
<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.7s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}

	.fadeSlideX-enter-active {
		animation: fadein 0.7s ease;
	}

	.fadeSlideX-leave-active {
		animation: fadeout 0.7s ease;
	}

	.fadeSlideY-enter-active {
		animation: fadeinY 0.7s ease;
	}

	.fadeSlideY-leave-active {
		animation: fadeoutY 0.7s ease;
	}

	@keyframes fadein {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}

		to {
			opacity: 1;
			transform: translateX(0px);
		}
	}

	@keyframes fadeout {
		from {
			opacity: 1;
			z-index: 1;
		}

		to {
			opacity: 0;
			z-index: 0;
			transform: translateX(10px);
		}
	}

	@keyframes fadeinY {
		from {
			opacity: 0;
			z-index: 1;
			transform: translateY(-10px);
		}

		to {
			opacity: 1;
			z-index: 0;
			transform: translateY(0px);
		}
	}

	@keyframes fadeoutY {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
			transform: translateY(10px);
		}
	}
</style>
