<template>
	<div>
		Courses
	</div>
</template>

<script >
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
	name: "course",
	data() {
		return {};
	},
	computed: {
		...mapGetters("gestion", ["getCourses"]),
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
</style>