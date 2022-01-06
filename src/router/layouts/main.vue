<template>
	<div class="flex flex-row view" v-bind="$attrs">
		<!-- props is {{ typeLayout }} -->

		<SideBar class="flex w-1/5 h-full bg-gray-900" />
		<div class="flex w-4/5">
			<main class="flex flex-col w-full bg-gray-100 relative">
				<!-- <div class="absolute top-0 left-0 z-10 h-full w-full">
					<svg id="patternId" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
						<defs>
							<pattern id="a" patternUnits="userSpaceOnUse" width="32" height="32" patternTransform="scale(3) rotate(30)">
								<rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,1)" />
								<path
									d="M37.657 10.343l-4.243 4.243m-2.828 2.828l-4.243 4.243m11.314 0l-4.243-4.243m-2.828-2.828l-4.243-4.243m-20.686 0l-4.243 4.243m-2.828 2.828l-4.243 4.243m11.314 0l-4.243-4.243m-2.828-2.828l-4.243-4.243"
									stroke-linejoin="round"
									stroke-linecap="round"
									stroke-width="1"
									stroke="hsla(141, 76%, 55%, 0.08)"
									fill="none"
								/>
								<path d="M16-8v6m0 4v6m8-8h-6m-4 0H8m8 24v6m0 4v6m8-8h-6m-4 0H8" stroke-linejoin="round" stroke-linecap="round" stroke-width="1" stroke="hsla(231, 91%, 23%, 0.18)" fill="none" />
							</pattern>
						</defs>
						<rect width="800%" height="800%" transform="translate(-81,0)" fill="url(%23a)" />
					</svg>
				</div> -->
				<Header />
				<BreadCrumbs v-if="showBraed" />
				<!-- <transition name="fadeSlide" mode="out-in"> -->
				<div class="h-full w-full bg-gray-100 px-6 py-6 view relative">
					<slot />
				</div>
				<!-- </transition> -->
				<Footer />
			</main>
		</div>
	</div>
</template>

<script>
import router from "@/router";
import Header from "@/components/header";
import SideBar from "@/components/side";
import BreadCrumbs from "@/components/breadcrumbs";
import Footer from "@/components/footer";

export default {
	components: { SideBar, Footer, Header, BreadCrumbs },
	data() {
		return {
			isMenuCondensed: false, dayo: false, showBraed: false
		};
	},
	// props: { typeLayout: String },
	created: () => {
		document.body.removeAttribute("data-layout", "horizontal");
		document.body.removeAttribute("data-topbar", "dark");
		document.body.removeAttribute("data-layout-size", "boxed");
	},
	methods: {
		toggleMenu() {
			document.body.classList.toggle("sidebar-enable");

			if (window.screen.width >= 992) {
				// eslint-disable-next-line no-unused-vars
				router.afterEach((routeTo, routeFrom) => {
					document.body.classList.remove("sidebar-enable");
					document.body.classList.remove("vertical-collpsed");
				});
				document.body.classList.toggle("vertical-collpsed");
			} else {
				// eslint-disable-next-line no-unused-vars
				router.afterEach((routeTo, routeFrom) => {
					document.body.classList.remove("sidebar-enable");
				});
				document.body.classList.remove("vertical-collpsed");
			}
			this.isMenuCondensed = !this.isMenuCondensed;
		},
		toggleRightSidebar() {
			document.body.classList.toggle("right-bar-enabled");
		},
		hideRightSidebar() {
			document.body.classList.remove("right-bar-enabled");
		},
	},
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 1.2s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fadeSlide-enter-active,
.fadeSlide-leave-active {
	transition: all 1.2s ease;
}

.fadeSlide-enter-from,
.fadeSlide-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
.view {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}
</style>

