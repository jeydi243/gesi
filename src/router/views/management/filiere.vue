<template>
	<div class="h-full w-full">
		<!-- <div class="flex flex-row-reverse mb-2">
			<button type="button" class="btn-primary">
				<AcademicCapIcon class="h-5 w-5 text-white" />
				<span class="self-center ml-2">Ajouter une fielère</span>
			</button>
		</div> -->
		<!-- <div class="card h-4/5">
			<h1 class="text-4xl font-bold">Filières</h1>
			<div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
				<div v-for="(item, indexFiliere) in filieres" :key="indexFiliere" class="rounded-lg select-none ">
					<div class="flex justify-center">
						<div class="rounded-lg shadow-lg bg-white max-w-sm">
							<a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light" class="aspect-h-16 aspect-w-9">
								 <img class="rounded-t-lg " :src="require(`@/assets/img/academic-${indexFiliere+1}.jpg`)" :alt="`Image - ${indexFiliere}`" /> 
							</a>
							<div class="p-6">
								<h5 class="text-gray-900 text-xl font-medium mb-2">Card title</h5>
								<p class="text-gray-700 text-base mb-4">
									{{ item.name }} Some quick example text to build on the card title and make up the bulk of the card's
									content.
								</p>
								<h6>{{ item.manager }}</h6>
								<button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div> -->
		<div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto">
			<div class="modal-dialog relative w-auto pointer-events-none">
				<div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
					<div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
						<h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
							Modal title
						</h5>
						<button type="button" class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body relative p-4">
						...Text
					</div>
					<div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
						<button type="button" class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">Close</button>
						<button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Understood</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script >
// import { mapGetters, mapActions, mapMutations } from "vuex";
import { AcademicCapIcon } from "@heroicons/vue/solid";
export default {
	name: "index-filiere",
	// components: { AcademicCapIcon },
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
					manager: "John Doe",
					long_name: "Genie Logiciel - Systemes informatique",
					gestionaire: "Pere Nsuko",
				},
				{
					name: "G2",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Genie Logiciel - Gestion",
					manager: "John Doe",
					gestionaire: "Nsulo George",
				},
				{
					name: "G3",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Design et Multimedia",
					manager: "John Doe",
					gestionaire: "Ndize Mbirwe",
				},
				{
					name: "Prépa",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Reseau et telecom",
					manager: "John Doe",
					gestionaire: "Kongolo Nbiko",
				},
				{
					name: "G3",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Design et Multimedia",
					manager: "John Doe",
					gestionaire: "Ndize Mbirwe",
				},
				{
					name: "Prepa",
					img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
					long_name: "Reseau et telecom",
					gestionaire: "Kongolo Nbiko",
					manager: "John Doe",
				},
			],
		};
	},

	methods: {},
};
</script>

<style lang="scss" scoped>
</style>