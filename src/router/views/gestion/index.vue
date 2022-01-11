<template>
    <div>
        <div class="flex border-b border-gray-200 mb-2">
            <button
                v-for="(tabLevel,index) in optionsGestion"
                :key="index"
                class="h-10 px-4 py-2 -mb-px text-sm transition-border ease-in-out hover:border-green-500 duration-700 text-center border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
                :class="{ 'text-green-600 border-green-500 bg-green-50 rounded-tl rounded-tr': tabLevel.current }"
                @click="changeTab(index)"
            >{{ tabLevel.name }}</button>
        </div>
        <div class="contentTab">
            <div class="card h-1/5">
                <h1 class="text-2xl">Année academique</h1>
                <span>En cours</span>
                <span class="text-2xl text-green-200 italic">2021-222</span>
                <input type="date" class="form-input rounded focus:outline-none focus:ring-0" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index-gestion",
    data() {
        return {
            isloading: "",
            optionsGestion: [{ name: "Academique", current: true }]
        }
    },
    methods: {
        changeTab(index) {
            this.optionsGestion.forEach((tab, i) => {
                tab.current = false
                if (i == index) {
                    tab.current = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>