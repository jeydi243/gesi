<template>
	<div id="app" class="container">
		<transition name="fade" mode="out-in">
			<Layout v-if="layout == 'main'" key="main" class="h-screen w-screen">
				<router-view v-slot="{ Component }">
					<transition name="fadeSlideX" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</Layout>
			<Auth v-else-if="layout == 'auth'" key="auth" class="h-screen w-screen">
				<router-view v-slot="{ Component }">
					<transition name="fadeSlideX" mode="out-in">
						<component :is="Component" />
					</transition>
				</router-view>
			</Auth>
		</transition>
	</div>
</template>
<script>
import Layout from "@/router/layouts/main";
import Auth from "@/router/layouts/auth";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
	name: "App",
	components: { Layout, Auth },
	computed: {
		...mapGetters({
			layout: "getLayout",
		}),
	},
	watch: {
		$route: function ({ meta, path, fullPath }) {
			if (meta.layout == "main") {
				this.changeLayout("main");
			} else if (meta.layout == "auth") {
				this.changeLayout(meta.layout);
			}
			this.changeActive(fullPath.split("/")[1]);
			// console.log(`%cPath name: ${path}`, "color: rgb(16,185,129) ; font-weight: bold ; padding: 4px ;");
		},
	},
	methods: {
		...mapActions(["changeLayout", "changeActive"]),
	},
};
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
	/* transition: fadein 0.7s ease; */
	animation: fadein 0.7s ease;
}

.fadeSlideX-leave-active {
	animation: fadeout 0.7s ease;
}
.fadeSlideY-enter-active {
	/* transition: fadein 0.7s ease; */
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
	}
	to {
		opacity: 0;
		transform: translateX(-10px);
	}
}
@keyframes fadeinY {
	from {
		opacity: 0;
		transform: translateY(-10px);
	}
	to {
		opacity: 1;
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
