<template>
	<div>
		<div class="card h-1/5">
			<h1 class="text-4xl font-bold">Filières</h1>
			<div class="grid grid-cols-2 gap-4 auto-cols-min w-1/2 h-full">
				<div v-for="(item, index) in filieres" :key="index" class="bg-pink-200 hover:scale-50 rounded-lg border w-20 h-20 select-none ">
					<div class="flex flex-col justify-center items-center">
						<div class="h-20 w-20 bg-indigo-300">
							<img :src="item.img" :alt="`Image de ${item.long_name}`" class="object-center bg-yellow-300 aspect-w-16 aspect-h-9">
						</div>
						<span class="text-2xl font-bold">{{ item.name }}</span>
						<span class="text-xs">{{ item.gestionaire }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script >
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
	name: "filiere",
	data() {
		//links to 5 unsplash profiles pictures
		const img = [
			"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
			"https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		];
		return {
			filieres: [
				{
					name: "G1",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Graduat 1",
					gestionaire: "Pere Nsuko",
				},
				{
					name: "G2",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Graduat 2",
					gestionaire: "Nsulo George",
				},
				{
					name: "G3",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Graduat 3",
					gestionaire: "Ndize Mbirwe",
				},
				{
					name: "Prepa",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Preparatoire",
					gestionaire: "Kongolo Nbiko",
				},
			],
		};
	},

	methods: {},
};
</script>

<style lang="scss" scoped>
</style>