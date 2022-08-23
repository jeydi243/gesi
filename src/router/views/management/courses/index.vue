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

<script setup></script>

<style lang="scss" scoped></style>
