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
				<div class="card2"></div>
			</div>
			<div class="card">
				<apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Home",
	components: {},
	data() {
		return {
			chartOptions: {
				colors: ["#6af699", "#f7b731"],
				chart: {
					id: "vuechart-example",
				},
				xaxis: {
					categories: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
				},
			},
			series: [
				{
					name: "series-1",
					data: [3000, 3500, 4000, 4200, 4500, 4700, 4900, 5000],
				},
			],
		};
	},
};
</script>
<style lang="css">
</style>
