<template>
	<Transition name="fadeSlideY" mode="out-in">
		<div class="modal-backdrop w-full relative">
			<div class="bg-white rounded-lg w-1/3" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
				<header class="modal-header text-3xl font-bold text-white rounded-t-lg row justify-between w-full bg-blue-800">
					<slot name="header"> </slot>
					<box-icon @click="close" class="icons" color="red" name="x"></box-icon>
					<!-- <XIcon @click="close" aria-label="Close modal" class="h-5 w-5 py-5 px-5 rounded-full hover:shadow-lg text-red-600 bg-red-500" data-mdb-ripple="true" data-mdb-ripple-color="light" /> -->
				</header>
				<section class="w-full h-full p-3" id="modalDescription">
					<slot> </slot>
				</section>

				<footer :class="{ 'modal-footer mt-2 p-3': $slots.footer }">
					<transition name="fadeSlideX" mode="out-in">
						<div v-if="isNewError" class="bg-red-500 text-white text-xs h-8 w-full rounded-b-lg">
							<!-- :class="{ '': isNewError }" -->
							{{ responseError["message"] }}
						</div>
					</transition>
					<slot name="footer"> </slot>
				</footer>
			</div>
		</div>
	</Transition>
</template>
<script setup>
	import { useConfig } from "@/store/config"
	import { ref, computed, watch } from "vue"
	const emit = defineEmits(["close"])
	const store = useConfig()
	const isNewError = ref(false)

	const responseError = computed(() => store.responseError)

	watch(responseError, (newval, oldval) => {
		if (newval) {
			isNewError.value = true
		}
	})
	function close() {
		emit("close")
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
		z-index: 900;
		background-color: rgba(15, 2, 2, 0.3);
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
		z-index: 901;
		animation: fadeIn;
		transition: fadeIn;
	}

	.modal-header,
	.modal-footer {
		padding: 15px;
		display: flex;
	}

	.modal-header {
		position: relative;
		border-bottom: 1px solid #eeeeee;
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
