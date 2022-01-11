<template>
  <div>
    <!-- <HomeIcon size="sm" class="h-5 w-5" /> -->
    <div class="flex flex-col select-none">
      <div class="grid grid-cols-4 auto-cols-max mb-3 mt-5 gap-2">
        <div class="card2 h-1/5 flex flex-col bg-gradient-to-tr">
          <h1 class="font-bold text-2xl text-green-200">5000</h1>
          <span>Students</span>
        </div>
        <div class="card2 h-1/5 flex flex-col bg-gradient-to-tr">
          <h1 class="font-bold text-2xl text-green-200">50</h1>
          <span>Professors</span>
        </div>
        <div class="card2"></div>
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
  name: 'Home',
  components: {},
  data() {
    return {
      chartOptions: {
        colors: ['#6af699', '#f7b731'],
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91]
      }]
    }
  }
}
</script>
<style lang="css">
</style>
