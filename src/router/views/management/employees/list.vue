<template>
    <!-- <Transition mode="out-in" name="fadeSlideX"> -->
        <div class="flex flex-col justify-between">
            <div class="card row w-full mb-4 justify-between">
                <span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Employees</span>
                <button @click.prevent="refresh" class="btn-primary">
                    <ArrowCircleDownIcon class="h-5 w-5 text-white" />
                </button>
                <button @click="goto('employees-add')" class="btn-primary">
                    <UserAddIcon class="h-5 w-5 text-white" />
                    <span class="self-center ml-2">Add employee</span>
                </button>
            </div>
            <div class="grid lg:grid-cols-5 md:grid-cols-3 xs:grid-cols-1 gap-4 auto-cols-min w-full h-full">
                <TransitionGroup :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
                    <span v-for="(emp, index) in employees" :key="index" class="card-emp select-none" :data-index="index">
                        <!-- {{ emp }} -->
                        <div class="flex justify-center">
                            <div class="rounded-lgbg-white max-w-sm">
                                <div class="p-2 flex flex-col items-center">
                                    <div class="text-green-800 flex flex-row justify-between w-full items-center text-center">
                                        <div class="h-4 min-w-9 rounded-sm text-xs">
                                            <span
                                                  class="px-3 my-1 bg-green-50 border-[1px] rounded-sm border-green-400 text-green-600"
                                                  v-if="chance.bool()">Active</span>
                                            <span class="px-3 my-1 bg-red-50 border-[1px] border-red-400 rounded-sm text-red-600" v-else>Not active</span>
                                        </div>
                                        <button class="rounded-bl-sm h-7 w-7 dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <DotsHorizontalIcon class="h-5 w-5" />
                                        </button>
                                        <ul class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                                            aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                   href="#" @click="goto('employees-details')">
                                                    <UserIcon class="h-5 w-5 inline mr-2" />Voir le profile
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                   href="#">
                                                    <MailIcon class="h-5 w-5 inline mr-2" />Send Email
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                   href="#" @click="goto('employees-update')">
                                                    <PencilIcon class="h-5 w-5 inline mr-2" />Edit
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="rounded-full bg-green-50 h-16 w-16 cursor-pointer overflow-clip">
                                        <img :src="emp.profile_img" />
                                    </div>
                                    <span class="text-lg font-bold">{{ emp.gender == "M" ? 'M.' : 'Ms.' }}{{ emp.name }}</span>
                                    <span class="text-lg">{{ emp.position[0] }} </span>
                                    <div class="rounded-lg bg-blue-50 col p-2 w-full">
                                        <div class="text-gray-700 text-base mb-4">
                                            <div class="flex flex-row justify-between">
                                                <div class="flex flex-col">
                                                    <span class="text-gray-500">Departement</span>
                                                    <span class="text-gray-800 font-bold">Soudure </span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <span class="text-gray-500">School</span>
                                                    <span class="text-gray-800 font-bold">{{ emp.school_name }} </span>
                                                </div>
                                            </div>
                                            Some quick example text to build on the card title and make up the bulk
                                        </div>
                                        <span>
                                            <MailIcon class="h-5 w-5 inline" /> {{ emp.personal_email }}
                                        </span>
                                        <span>
                                            <PhoneIcon class="h-5 w-5 inline" /> {{ emp.telephones[0] }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </TransitionGroup>
            </div>
        </div>
        <!-- <AddEmployee v-else @cancel="changeView" /> -->
    <!-- </Transition> -->
</template>

<script setup>
import { ref, computed } from "vue"
import { mapActions, mapGetters, useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { UserAddIcon, DotsHorizontalIcon, MailIcon, PhoneIcon, ArrowCircleDownIcon, PencilIcon, UserIcon } from "@heroicons/vue/solid"
import AddEmployee from "@/router/views/management/employees/add.vue"
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
function goto(to) { router.push({ name: to }) }
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
