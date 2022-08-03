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
// import { onBeforeEnter, onEnter, onLeave, goto } from '@/utils/utils'
import { useRouter, useRoute } from 'vue-router'
import { UserAddIcon, DotsHorizontalIcon, MailIcon, PhoneIcon, ArrowCircleDownIcon, PencilIcon, UserIcon } from "@heroicons/vue/solid"
import { gsap } from "gsap"
import * as Chance from "chance"
const chance = new Chance()

const store = useStore()
const router = useRouter()
var showAddEmploye = ref(false)


function changeView() {
    showAddEmploye.value = !showAddEmploye.value
}
const employees = computed(() => store.getters['management/getEmployees'])

function refresh() {
    store.dispatch('management/getAllEmployees')
}
</script>

<style scoped>
</style>
