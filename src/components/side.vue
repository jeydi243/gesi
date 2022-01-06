<template>
    <div class="flex flex-col justify-center items-center overflow-hidden text-gray-400 select-none">
        <div class="flex flex-col place-items-center w-full mt-1">
            <router-link
                :to="item.to"
                @hover="item.mouseHover = !item.mouseHover"
                @click="changeActive(index)"
                v-for="(item,index) in listSideMenus"
                :key="index"
                class="transition-border hover:border-l-2 hover:border-l-green-500 ease-out-in duration-700 animation-ping flex items-center w-full h-9 px-3 mt-2 hover:text-white"
                :class="{ 'bg-green-500 text-gray-900': item.active }"
                href="#"
            >
                <box-icon type="solid" :name="item.icon" :color="item.mouseHover ? 'gray' : 'white'"></box-icon>
                <span class="ml-2 text-sm font-medium">{{ item.text }}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { BeakerIcon } from '@heroicons/vue/solid'
export default {
    name: "sideLeft", data() {
        return {
            currentActive: 0,
        }
    }, computed: {
        ...mapGetters(
            { listSideMenus: 'getListSideMenus' }
        ),

    },
    methods: {
        ...mapActions(['changeLayout', "changeActive"]),
        changeActive(index) {
            this.currentActive = this.listSideMenus.findIndex(item => item.active);
            this.listSideMenus[this.currentActive].active = false;
            this.listSideMenus[index].active = true;
        }
    },
}
</script>

<style lang="scss" scoped>
</style>