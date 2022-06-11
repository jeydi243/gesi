<template>
	<div class="home font-k2d">
		<div class="bg-white h-[35px] rounded w-full pl-2 mb-3 relative flex flex-row align-middle items-center shadow-md shadow-gray-50">
			<box-icon name="search" color="gray" size="sm" class="self-middle self-center text-center"></box-icon>
			<input type="text" class="outline-none ring-0 placeholder-gray-300 focus:outline-none text-base focus:ring-transparent h-[35px] w-full placeholder:text-gray-200" placeholder="Search student globally by email or matricule or name" />
		</div>
		<div class="flex border-b border-gray-200 mb-2">
			<button v-for="(tabLevel,index) in levels" :key="index" class="btn-tab" :class="{ 'btn-tab-active': tabLevel.current }" @click="changeLevel(index)">{{ tabLevel.name }}</button>
		</div>
		<transition name="fade" mode="out-in" duration="500">
			<ListStudent :level="currentTabLevel" v-if="isLevelChanged" />
		</transition>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import ListStudent from "@/components/list-student.vue";
import { useIpcRenderer } from "@vueuse/electron";
const ipcRenderer = useIpcRenderer();
export default {
	name: "index-students",
	components: {
		ListStudent,
	},
	data() {
		return {
			isloading: "",
			isLevelChanged: true,
		};
	},
	computed: {
		...mapGetters("students", { students: "mystudents" }),
		...mapGetters({ levels: "getListLevel", currentTabLevel: "currentLevel" }),
	},
	watch: {
		currentTabLevel: function (newVal, oldVal) {
			if (newVal != oldVal) {
				this.isLevelChanged = false;
				setTimeout(() => {
					this.isLevelChanged = true;
				}, 200);
			}
		},
	},
	created() {},
	mounted() {
		ipcRenderer.on("ping", (event, message) => {
			console.log(message);
		});
	},
	methods: {
		...mapActions("students", ["getAllStudents"]),
		...mapMutations({ changeLevel: "CHANGE_LEVEL_MENU" }),
		goto(index) {
			return this.$router.push({ name: "students-details", params: { id: this.students[index]._id } });
		},
	},
};
</script>