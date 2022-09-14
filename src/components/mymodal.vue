<template>
	<Transition name="fadeSlideY" mode="out-in">
		<div class="modal-backdrop w-full relative">
			<div class="bg-white rounded-lg p-3 w-1/3" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
				<header class="modal-header row justify-between w-full">
					<slot name="header"> </slot>
					<box-icon class="icons" color="red"></box-icon>
					<XIcon @click="close" aria-label="Close modal" class="h-5 w-5 py-5 px-5 rounded-full hover:shadow-lg text-red-600 bg-red-500" data-mdb-ripple="true" data-mdb-ripple-color="light" />
				</header>

				<section class="w-full h-full" id="modalDescription">
					<slot> </slot>
				</section>

				<footer :class="{ 'modal-footer mt-2': $slots.footer }">
					<slot name="footer"> </slot>
				</footer>
			</div>
		</div>
	</Transition>
</template>
<script>
	import { XIcon } from "@heroicons/vue/solid"
	export default {
		name: "Modal",
		components: {
			XIcon,
		},
		emits: ["close"],
		methods: {
			close() {
				this.$emit("close")
			},
		},
	}
</script>

.

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 800;
		background-color: rgba(15, 2, 2, 0.3);
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		animation: fadeIn;
	}

	.modal {
		background: #ffffff;
		overflow-x: auto;
		display: flex;
		flex-direction: column;
		z-index: 801;
		animation: fadeIn;
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

	.btn-close {
		position: absolute;
		top: 0;
		right: 0;
		border: none;
		font-size: 20px;
		padding: 10px;
		cursor: pointer;
		font-weight: bold;
		color: red;
		background: white;
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
</style>
