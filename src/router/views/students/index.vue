<template>
    <div class="home font-k2d">
        <div class="bg-white h-[35px] rounded w-full pl-2 mb-3 relative flex flex-row align-middle items-center shadow-md shadow-gray-50">
            <box-icon name="search" color="gray" size="sm" class="self-middle self-center text-center"></box-icon>
            <input type="text" class="outline-none ring-0 placeholder-gray-300 focus:outline-none text-base focus:ring-transparent h-[35px] w-full placeholder:text-gray-200" placeholder="Search student globally by email or matricule or name" />
        </div>
        <div class="flex border-b border-gray-200 mb-2">
            <button
                v-for="(tabLevel,index) in levels"
                :key="index"
                class="h-10 px-4 py-2 -mb-px text-sm transition-border ease-in-out hover:border-green-500 duration-700 text-center border-b-2 sm:text-base whitespace-nowrap focus:outline-none"
                :class="{ 'text-green-600 border-green-500 bg-green-50 rounded-tl rounded-tr': tabLevel.current }"
                @click="changeLevel(index)"
            >{{ tabLevel.name }}</button>
        </div>
        <transition name="fadeSlide" mode="out-in" duration="500">
            <ListStudent :level="currentTabLevel" v-if="isLevelChanged" />
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ListStudent from "@/components/list-student.vue"
export default {
    name: "index-students",
    components: {
        'ListStudent': ListStudent
    },
    data() {
        return {
            isloading: "",
            // students: [{ id: "2098630150", year: 1961, name: "Mukadi Papy", email: "mukadi@example.com" }, { id: "8447551447", year: 1961, name: "Choi Ngandu", email: "example@yg.com" }, { id: "4521491271", year: 1961, name: "Jnr Choi", email: "example@yg.com" }]
            isLevelChanged: true
        }
    },
    computed: {
        ...mapGetters("students",
            { students: 'mystudents' }
        ),
        ...mapGetters(
            { levels: 'getListLevel', currentTabLevel: 'currentLevel' }
        )
    },
    watch: {
        currentTabLevel: function (newVal, oldVal) {
            if (newVal != oldVal) {
                this.isLevelChanged = false
                setTimeout(() => {
                    this.isLevelChanged = true
                }, 200);
            }
        }
    },
    methods: {
        ...mapActions("students", ['getStudents']),
        ...mapMutations({ changeLevel: 'CHANGE_LEVEL_MENU' }),
        goto(index) {
            return this.$router.push({ name: "students-details", params: { id: this.students[index]._id } })
        }
    },
}
</script>


<style lang="scss" scoped>
</style>