<template>
    <header class="flex w-full h-[50px] bg-white text-black items-center justify-end px-10 border-t-2 border-t-gray-300">
        <div class="avatar rounded-full">
            <img src="@/assets/img/user.png" class />
        </div>

        <div class="relative inline-block">
            <!-- Dropdown toggle button -->
            <button
                @click="dropdown = !dropdown"
                id="toggle-dropdown"
                class="relative z-20 text-gray-700 bg-white border border-transparent rounded-md focus:border-transparent focus:ring-opacity-40 focus:ring-transparent focus:outline-none flex flex-row"
            >
                <span class="ml-2">Name of user</span>
                <svg class="w-5 h-5 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>

            <!-- Dropdown menu -->
            <div id="dropdown" class="absolute right-0 z-30 w-48 py-2 mt-4 bg-white rounded-md shadow-xl shadow-gray-300 font-bold transition-all duration-700" v-if="dropdown">
                <span href="#" class="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform hover:text-green-900 hover:bg-green-100 hover:cursor-pointer" @click="goto('profile')">Profile</span>
                <span href="#" class="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform hover:text-green-900 hover:bg-green-100 hover:cursor-pointer" @click="goto('index-settings')">Settings</span>
                <span class="h-1 w-full border-b border-yellow-300"></span>
                <span href="#" class="block px-4 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 transform hover:text-red-500 hover:bg-red-50 hover:cursor-pointer" @click="goto('login')">Sign Out</span>
            </div>
        </div>
    </header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "Header",
    data() {
        return {
            dropdown: false
        }
    },
    methods: {
        ...mapActions('authentication', ['logout']),
        goto(name) {
            if (name === "login") {
                // this.logout();
            }
            this.dropdown = !this.dropdown;
            this.$router.push({ name });
        }
    },
}
</script>

<style lang="scss" scoped>
</style>