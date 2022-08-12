<template>
  <div
    class="relative left-0 top-0 flex flex-col justify-center items-center overflow-hidden text-gray-400 select-none"
  >
    <div class="flex flex-col place-items-center w-full mt-1">
      <TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
        <router-link
          data-mdb-ripple="true"
          data-mdb-ripple-color="success"
          :to="item.to"
          @click="config.changeActive(item.to)"
          @hover="item.mouseHover = !item.mouseHover"
          v-for="(item, index) in listSideMenus"
          :data-index="index"
          :key="index"
          class="router-link"
          :class="{ 'router-link-active': item.active }"
        >
          <box-icon type="regular" :name="item.icon" color="white"></box-icon>
          <span class="ml-2 text-sm font-medium">{{ item.text }}</span>
        </router-link>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeEnter, onEnter, onLeave } from "@/utils/utils"
  import { computed, ref } from "vue"
  import { useConfig } from "@/store/config"

  const config = useConfig()
  const currentActive = ref(0)
  const listSideMenus = computed(() => config.listSideMenus)
</script>

<style lang="scss" scoped></style>