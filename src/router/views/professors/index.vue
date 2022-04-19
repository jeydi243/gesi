<template>
	<div>
		<div class="bg-white h-[35px] rounded w-full pl-2 mb-3 relative flex flex-row align-middle items-center shadow-md shadow-gray-50">
			<box-icon name="search" color="gray" size="sm" class="self-middle self-center text-center"></box-icon>
			<span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center">
				<SearchIcon class="h-5 w-5 self-center text-center text-gray-300" />
			</span>
			<input type="text" class="outline-none ring-0 placeholder-gray-300 focus:outline-none text-base focus:ring-transparent h-[35px] w-full placeholder:text-gray-200" placeholder="Search professor globally by email or matricule or name" />
			<button class="bg-green-500 h-full text-white rounded-md px-3">Search</button>
		</div>

		<transition name="fadeSlide" mode="out-in" duration="500">
			<div class="display-list" v-if="display == 'list'" key="h4">
				<ListProfessor />
			</div>
			<div class="display-grid grid grid-cols-4 gap-2 auto-cols-auto h-full auto-rows-auto" v-else key="h1">
				<div class="h-[200px] bg-white rounded-lg shadow-lg relative" v-for="(prof, index) in professors" :key="index">
					<div class="card-img h-[30%] bg-green-50 w-full">
						<!-- <img :src="require('@/assets/img/user.png')" class="object-cover" /> -->
						<mdicon name="react" :width="30" :height="30" />
					</div>
					<div class="content flex flex-col px-2">
						<span class="text-base font-bold">{{ prof.name }}</span>
						<span class="text-sm">{{ prof.lastname }}</span>
					</div>
					<div class="footer flex flex-row rounded-lg absolute bottom-0 w-full left-0 h-[20%] items-center content-center place-items-center">
						<a class="bg-blue-200 text-blue-900 w-full h-full rounded-bl-lg text-center" href="tel:+243897949336">Call</a>
						<a class="bg-green-200 text-green-900 w-full h-full rounded-br-lg text-center" :href="`mailto:${prof.email}`">Text</a>
					</div>
				</div>
				<nav aria-label="Page navigation example">
					<ul class="inline-flex items-center -space-x-px">
						<li>
							<a href="#" class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								<span class="sr-only">Previous</span>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
							</a>
						</li>
						<li>
							<a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
						</li>
						<li>
							<a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
						</li>
						<li>
							<a href="#" aria-current="page" class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
						</li>
						<li>
							<a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
						</li>
						<li>
							<a href="#" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
						</li>
						<li>
							<a href="#" class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
								<span class="sr-only">Next</span>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
								</svg>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</transition>
	</div>
</template>

<script>
import ListProfessor from "@/components/list-professor.vue";
export default {
	name: "index-professors",
	components: {
		ListProfessor,
	},
	data() {
		return {
			display: "list",
			professors: [
				{
					id: 1,
					name: "Myra Hunt",
					lastname: "Micheal Sims",
					email: "bu@mah.jo",
					telephone: "(681) 698-7272",
				},
				{
					id: 1,
					name: "Leonard Wolfe",
					lastname: "Jonathan Aguilar",
					email: "we@waheki.nc",
					telephone: "(378) 377-3557",
				},
				{
					id: 1,
					name: "Maggie Hoffman",
					lastname: "Blake Meyer",
					email: "daphu@bikehsu.dk",
					telephone: "(913) 591-1103",
				},
				{
					id: 1,
					name: "Erik Maldonado",
					lastname: "Lucile Santos",
					email: "zibew@wirbikce.fk",
					telephone: "(723) 581-6996",
				},
				{
					id: 1,
					name: "Ina Hunt",
					lastname: "Khaby",
					email: "fo@magra.rs",
					telephone: "(447) 737-7108",
				},
			],
		};
	},
};
</script>

<style scoped>
</style>