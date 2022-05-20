<template>
	<Transition name="fadeSlideY" mode="out-in">
		<div class="modal-backdrop">
			<div class="modal rounded-lg p-3" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
				<header class="modal-header flex flex-row justify-between w-full">
					<slot name="header">
					</slot>
					<XIcon @click="close" aria-label="Close modal" class="h-5 w-5" />
				</header>

				<section class="modal-body" id="modalDescription">
					<slot>
					</slot>
				</section>

				<footer class="modal-footer">
					<slot name="footer">
					</slot>
				</footer>
			</div>
		</div>
	</Transition>
</template>
<script>
import { XIcon } from "@heroicons/vue/solid";
export default {
	name: "Modal",
	components: {
		XIcon,
	},
	emits: ["close"],
	methods: {
		close() {
			this.$emit("close");
		},
	},
};
</script>

.

<style>
.modal-backdrop {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 300;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(5px);
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal {
	background: #ffffff;
	overflow-x: auto;
	display: flex;
	flex-direction: column;
}

.modal-header,
.modal-footer {
	padding: 15px;
	display: flex;
}

.modal-header {
	position: relative;
	border-bottom: 1px solid #eeeeee;
	color: #4aae9b;
	justify-content: space-between;
}

.modal-footer {
	border-top: 1px solid #eeeeee;
	flex-direction: column;
}

.modal-body {
	position: relative;
	padding: 20px 10px;
}

.btn-close {
	position: absolute;
	top: 0;
	right: 0;
	border: none;
	font-size: 20px;
	padding: 10px;
	cursor: pointer;
	font-weight: bold;
	color: #4aae9b;
	background: transparent;
}
</style>