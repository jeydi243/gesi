<template>
	<div>
		<!-- <HomeIcon size="sm" class="h-5 w-5" /> -->
		<div class="flex flex-col select-none">
			<div class="grid grid-cols-4 auto-cols-max mb-3 mt-5 gap-2">
				<div class="card2 h-1/5 flex flex-col bg-gradient-to-tr">
					<h1 class="font-bold text-2xl text-green-200">5000</h1>
					<span class="text-2xl font-bold text-green-800">Students</span>
				</div>
				<div class="card2 h-1/5 flex flex-col bg-gradient-to-tr">
					<h1 class="font-bold text-2xl text-green-200">50</h1>
					<span class="text-2xl font-bold text-green-800">Professors</span>
				</div>
				<div class="card2 h-1/5 flex flex-col bg-gradient-to-tr">
					<h1 class="font-bold text-2xl text-green-200">20</h1>
					<span class="text-2xl font-bold text-green-800">Rooms</span>
				</div>
				<div class="card2 h-1/5 flex flex-col bg-gradient-to-tr">
					<h1 class="font-bold text-2xl text-green-200">2000</h1>
					<span class="text-2xl font-bold text-green-800">Alumnis</span>
				</div>
			</div>
			<div class="row space-x-2">
				<div class="card w-1/2"><apexchart class="w-full" height="450" :options="chartOptions" :series="series"></apexchart></div>

				<div class="card w-1/2 col h-full">
					<div class="row justify-between">
						<div class="text-2xl font-bold row">Latest candidates <span class="bg-gray-100 text-sm rounded-lg px-2 items-center text-gray-500 align-middle">220</span></div>
						<button type="button" class="rounded-full h-10 w-10" data-mdb-ripple="true" data-mdb-ripple-color="success"><box-icon name="dots-vertical-rounded" color="green" class="bg-red cursor-pointer"></box-icon></button>
					</div>
					<template v-for="i in 8" :key="i">
						<a class="row items-center justify-between block py-1 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600 transition duration-500">
							<div class="row items-center">
								<img :src="`https://mdbcdn.b-cdn.net/img/new/avatars/${i}.webp`" class="rounded-full w-10 h-10" alt="Avatar" />
								<div class="col ml-2">
									<span class="text-lg font-bold">{{ chance.last() }}</span>
									<span class="text-sm">From: {{ "Cameron" }}</span>
								</div>
							</div>
							<button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
						</a>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { chance } from "@/utils/utils"
	import { ref } from "vue"

	const chartOptions = ref({
		title: {
			text: "List of students by year",
			align: "left",
			margin: 10,
			offsetX: 0,
			offsetY: 0,
			floating: false,
			style: {
				fontSize: "24px",
				fontWeight: "bold",
				fontFamily: "k2d",
				color: "#263238",
			},
		},
		colors: ["#6af699", "#f7b731", "#231ac9"],
		chart: {
			id: "vuechart-example",
			type: "bar",
		},
		stroke: {
			curve: "smooth",
		},
		dataLabels: {
			enabled: false,
		},
		plotOptions: {
			bar: {
				distributed: true,
				horizontal: false,
				borderRadius: 5,
			},
		},
		xaxis: {
			categories: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
		},
	})
	const series = ref([
		{
			name: "Nombre d'étudiants",
			data: [3000, 3500, 4000, 4200, 4500, 4700, 4000, 3000],
		},
	])
</script>
<style lang="css"></style>
