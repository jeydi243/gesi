<template>
    <div>
        <div class="flex flex-col justify-between">
            <div class="card row mb-4 justify-end">
                <button @click="$router.push({ name: 'employees-add' })" class="btn-primary">
                    <UserAddIcon class="h-5 w-5 text-white" />
                    <span class="self-center ml-2">Ajouter</span>
                </button>
            </div>
            <RouterView v-slot="{ Component }">
                <Transition name="fadeSlideX" mode="out-in">
                    <component :is="Component" />
                </Transition>
            </RouterView>
            <div class="grid grid-cols-5 gap-4 auto-cols-min w-full h-full">
                <span v-for="index in 16" :key="index" class="card-emp select-none " :data-index="index">
                    <div class="flex justify-center">
                        <div class="rounded-lg shadow-lg bg-white max-w-sm">
                            <div class="p-2 flex flex-col items-center">
                                <div class="text-green-800 flex flex-row justify-between w-full items-center text-center ">
                                    <div class="h-4 min-w-9 rounded-sm text-xs">
                                        <span class="px-3 my-1 bg-green-50 border-[1px] border-green-400 text-green-600" v-if="chance.bool()">Active</span>
                                        <span class="px-3 my-1 bg-red-50 border-[1px] border-red-400  text-red-600 " v-else>Not active</span>
                                    </div>
                                    <button class="rounded-bl-sm  h-7 w-7">
                                        <DotsHorizontalIcon class="h-5 w-5" />
                                    </button>
                                </div>
                                <div class="rounded-full bg-green-50 h-16 w-16 cursor-pointer"></div>
                                <span class="text-lg font-bold">{{ chance.name({ suffix: true }) }}</span>
                                <span class="text-lg">Developer Senior</span>
                                <div class="rounded-lg bg-blue-50 flex flex-col p-2">
                                    <div class="text-gray-700 text-base mb-4">
                                        <div class="flex flex-row justify-between">
                                            <div class="flex flex-col">
                                                <span class="text-gray-500">Departement</span>
                                                <span class="text-gray-800 font-bold">Soudure
                                                </span>
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="text-gray-500"> Date enter</span>
                                                <span class="text-gray-800 font-bold">{{ chance.date({ year: 1983, string: true }) }}
                                                </span>
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
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import gsap from 'gsap';
import { UserAddIcon, DotsHorizontalIcon, MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import * as Chance from 'chance'
const chance = new Chance()


function onBeforeEnter(el) {
    gsap.to(el, {
        opacity: 0,
        y: -50
    })
}
function onEnter(el, done) {
    gsap.to(el, {
        opacity: 1, y: 0, duration: 0.5,
        delay: el.dataset.index * 0.20,
        onComplete: done
    })
}
</script>

<style  scoped>
</style>