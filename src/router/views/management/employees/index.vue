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
import { mapActions, useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { UserAddIcon, DotsHorizontalIcon, MailIcon, PhoneIcon, ArrowCircleDownIcon, PencilIcon, UserIcon } from "@heroicons/vue/solid"
import { gsap } from "gsap"
import * as Chance from "chance"
const chance = new Chance()

const store = useStore()

var showAddEmploye = ref(false)
//import mapActions
const router = useRouter()


function onBeforeEnter(el) {
    gsap.to(el, {
        opacity: 0,
        x: -20,
    })
}

function changeView() {
    showAddEmploye.value = !showAddEmploye.value
}
const employees = computed(() => store.getters['management/getEmployees'])
async function goto(to) { await router.push({ name: to }) }
function onEnter(el, done) {
    gsap.to(el, {
        opacity: 1,
        duration: 2,
        delay: el.dataset.index * 0.25,
        x: 0,
        onComplete: done
    })
}
function onLeave(el, done) {
    gsap.to(el, {
        opacity: 0,
        delay: el.dataset.index * 0.25,
        duration: 2,
        y: -40,
        onComplete: done
    })
}
function refresh() {
    store.dispatch('management/getAllEmployees')
}
</script>

<style scoped>
</style>
