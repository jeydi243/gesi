<template>
    <div>
        <router-view v-slot="{ Component, route }">
            <Transition name="fadeSlideX" mode="out-in">
                <div :key="route.name">
                    <component :is="Component" />
                </div>
            </Transition>
        </router-view>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useStore } from 'vuex'
import * as Chance from "chance"
const chance = new Chance()

const store = useStore()
var showAddEmploye = ref(false)

const employees = computed(() => store.getters['management/getEmployees'])

function refresh() {
    store.dispatch('management/getAllEmployees')
}
</script>

<style scoped>
</style>
