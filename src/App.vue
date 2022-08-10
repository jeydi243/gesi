<template>
	<div id="app" class=" h-screen w-screen">
		<div class="row h-full w-full" v-bind="$attrs">
			<SideBar class="flex w-[15%] h-full bg-gray-900" />
			<main class="col w-[85%] h-full relative bg-gray-100 overflow-auto">
				<Header />
				<!-- {{ $route.path }} -->
				<BreadCrumbs v-if="showBraedCrumbs" />
				<div class="h-[90%] w-full bg-gray-100 px-6 py-6 overflow-auto">
					<router-view v-slot="{ Component }">
						<Transition name="fadeSlideX" mode="out-in">
							<component :is="Component" />
						</Transition>
					</router-view>
				</div>
				<Footer />
			</main>
		</div>
	</div>
</template>
<script setup>
import Footer from "@/components/footer";
import Header from "@/components/header";
import SideBar from "@/components/side";
import BreadCrumbs from "@/components/breadcrumbs";
import { useStore } from "vuex";
import { watch, ref, onMounted } from "vue";
import { useIpcRendererOn } from '@vueuse/electron'
import { useRoute } from 'vue-router';
const store = useStore()
const route = useRoute()
let showBraedCrumbs = ref(false)

useIpcRendererOn('ping', (event, ...args) => {
	console.log(args)
})

watch(() => route, function ({ meta, fullPath }) {
	console.log('Hum');
	changeLayout(meta.layout)
	this.changeActive(fullPath.split("/")[1]);
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
		transform: translateX(-10px);
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
		transform: translateY(-10px);
	}
}
</style>
