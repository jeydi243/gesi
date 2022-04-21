<template>
	<div class="flex flex-row" v-bind="$attrs">
		<SideBar class="flex w-[15%] h-full bg-gray-900" />
		<div class="flex w-[85%] h-full">
			<main class="relative flex flex-col w-full bg-gray-100 ">
				<Header />
				<BreadCrumbs v-if="showBraed" />
				<div class="h-[87%] w-full bg-gray-100 px-6 py-6 view">
					<Transition name="fade" mode="out-in">
						<slot />
					</Transition>
				</div>
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
			isMenuCondensed: false,
			dayo: false,
			showBraed: false,
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
body {
	overflow-x: hidden;
}
.view {
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: thin; /* Firefox */

	overflow-y: scroll;
}
.view::-webkit-scrollbar {
	width: 15px;
}

.view::-webkit-scrollbar-track {
	box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
}

.body::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #555;
}
</style>

