<template>
    <div>

        <Transition mode="out-in" name="fadeSlideX">
            <div class="flex flex-col justify-between" v-if="!showAddEmploye">
                <div class="card row w-full mb-4 justify-between">
                    <span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Employees</span>
                    <button @click="changeView" class="btn-primary">
                        <UserAddIcon class="h-5 w-5 text-white" />
                        <span class="self-center ml-2">Add</span>
                    </button>
                </div>

                <div class="grid grid-cols-5 gap-4 auto-cols-min w-full h-full">
                    <span v-for="index in 16" :key="index" class="card-emp select-none" :data-index="index">
                        <div class="flex justify-center">
                            <div class="rounded-lg shadow-lg bg-white max-w-sm">
                                <div class="p-2 flex flex-col items-center">
                                    <div class="text-green-800 flex flex-row justify-between w-full items-center text-center">
                                        <div class="h-4 min-w-9 rounded-sm text-xs">
                                            <span
                                                  class="px-3 my-1 bg-green-50 border-[1px] border-green-400 text-green-600"
                                                  v-if="chance.bool()">Active</span>
                                            <span class="px-3 my-1 bg-red-50 border-[1px] border-red-400 text-red-600" v-else>Not active</span>
                                        </div>
                                        <button class="rounded-bl-sm h-7 w-7 dropdown" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <DotsHorizontalIcon class="h-5 w-5" />
                                        </button>
                                        <ul class="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
                                            aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                   href="#">
                                                    <MailIcon class="h-5 w-5 inline mr-2" /> Send Email
                                                </a>
                                            </li>
                                            <li>
                                                <a class="dropdown-item text-sm py-2 px-2 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                                                   href="#" @click="goto('employees-details')">
                                                    <PencilIcon class="h-5 w-5 inline mr-2" />Edit
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="rounded-full bg-green-50 h-16 w-16 cursor-pointer overflow-clip">
                                        <img :src="chance.avatar({ protocol: 'https' })" alt="" srcset="">
                                    </div>
                                    <span class="text-lg font-bold">{{ chance.name({ suffix: true }) }}</span>
                                    <span class="text-lg">Developer Senior </span>
                                    <div class="rounded-lg bg-blue-50 flex flex-col p-2">
                                        <div class="text-gray-700 text-base mb-4">
                                            <div class="flex flex-row justify-between">
                                                <div class="flex flex-col">
                                                    <span class="text-gray-500">Departement</span>
                                                    <span class="text-gray-800 font-bold">Soudure </span>
                                                </div>
                                                <div class="flex flex-col">
                                                    <span class="text-gray-500"> Date enter</span>
                                                    <span class="text-gray-800 font-bold">{{ chance.date({ year: 1983, string: true }) }} </span>
                                                </div>
                                            </div>
                                            Some quick example text to build on the card title and make up the bulk
                                        </div>
                                        <span>
                                            <MailIcon class="h-5 w-5 inline" /> {{ chance.email() }}
                                        </span>
                                        <span>
                                            <PhoneIcon class="h-5 w-5 inline" /> {{ chance.phone() }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
            <AddEmployee v-else @cancel="changeView" />
        </Transition>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from 'vue-router'
import gsap from "gsap"
import AddEmployee from "@/router/views/management/employees/add.vue"
import { UserAddIcon, DotsHorizontalIcon, MailIcon, PhoneIcon, PencilIcon } from "@heroicons/vue/solid"
import * as Chance from "chance"
const chance = new Chance()
var showAddEmploye = ref(false)
const router = useRouter()


function onBeforeEnter(el) {
    gsap.to(el, {
        opacity: 0,
        y: -50,
    })
}
function goto(to) { router.push({ name: to }) }
function changeView() {
    showAddEmploye.value = !showAddEmploye.value
}
function onEnter(el, done) {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: el.dataset.index * 0.2,
        onComplete: done,
    })
}
</script>

<style scoped>
</style>
