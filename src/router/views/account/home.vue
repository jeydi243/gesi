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
        <div class="card2">
          <mdicon name="alert" />
        </div>
        <div class="card2"></div>
      </div>
      <div class="card"></div>
    </div>
  </div>
</template>

<script>
import { HomeIcon } from '@heroicons/vue/solid'
export default {
  name: 'Home',
  components: {}
}
</script>
<style lang="css">
</style>
