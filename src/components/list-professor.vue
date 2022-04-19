<template>
	<div class="w-full bg-white rounded shadow-gray-50 p-3 h-auto">
		<div class="flex flex-row justify-between w-full pb-5">
			<div class="relative flex w-72 flex-wrap items-stretch">
				<span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center w-8">
					<box-icon name="search" type="regular" color="gray" size="sm" class="self-center text-center"></box-icon>
				</span>
				<input type="text" placeholder="Find professor by Name or Matricule" class="px-3 py-3 caret-green-500 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:ring-transparent w-full pl-10" />
			</div>

			<button @click="$router.push({ name: 'professors-add' })" class="btn-primary">
				<box-icon name="user-plus" type="regular" color="white"></box-icon>
				<span class="self-center ml-2">Ajouter</span>
			</button>
		</div>
		<table class="table-fixed w-full">
			<thead class="bg-green-50 w-full mb-5 rounded table-header-group mx-5 px-5">
				<tr class="pl-5 text-left table-row h-10">
					<th>#</th>
					<th>Matricule</th>
					<th>Name</th>
					<th>Email</th>
					<th>Level</th>
					<th>Statut</th>
				</tr>
			</thead>
			<!-- <tbody v-if="professors != null"> -->
			<transition-group name="fade" tag="tbody" mode="out-in">
				<tr class="table-row" v-for="(professor,index) in professors(filtre)" :key="index" @click="goto(index)">
					<td>{{ index }}</td>
					<td class="t">{{ professor.matricule }}</td>
					<td>{{ professor.name }}</td>
					<td>{{ professor.email }}</td>
					<td>{{ professor.niveau }}</td>
					<td>{{ professor.statut }}</td>
				</tr>
			</transition-group>
			<!-- </tbody> -->
		</table>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
	name: "list-professors",
	data() {
		return {
			filtre: "",
		};
	},
	computed: {
		...mapGetters("professors", { professors: "myprofessors" }),
	},
};
</script>

<style lang="scss" scoped>
</style>