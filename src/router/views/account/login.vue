<template>
    <div class="flex flew-row justify-center h-full bg-gray-100">
        <div class="w-full max-w-sm p-3 flex flex-col h-4/5 justify-center self-center bg-white rounded-md shadow-md font-k2d">
            <h1 class="flex text-3xl font-semibold self-center text-center text-green-500">GESI</h1>

            <form class="mt-6 flex flex-col">
                <div>
                    <label for="username" class="block text-sm text-gray-800">Username</label>
                    <input v-model="user.username" type="text" class="block w-full px-4 py-1 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>
                Token: {{ token }}
                <div class="mt-4">
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm text-gray-800">Mot de passe</label>
                        <a href="#" class="text-xs text-green-600 hover:underline">Mot de passe oublié ?</a>
                    </div>

                    <input v-model="user.password" type="password" class="block w-full px-4 py-1 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                </div>

                <div class="flex items-center mb-4 mt-2">
                    <input
                        id="checkbox-2"
                        aria-describedby="checkbox-2"
                        type="checkbox"
                        :checked="user.stay_connected"
                        class="w-4 h-4 text-green-600 mr-2 bg-gray-100 rounded border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-2" class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Rester connecté ?</label>
                </div>
                <div class="mt-6">
                    <button
                        :disabled="isloading"
                        @click.prevent="loger"
                        :class="{ 'cursor-wait': isloading }"
                        class="w-full px-4 py-2 tracking-wide shadow-lg shadow-green-200 text-white transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-gray-600"
                    >
                        <svg viewBox="0 0 24 24" class="animate-spin h-5 w-5 mr-3 inline-flex spinner">
                            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
                        </svg> Se Connecter
                    </button>
                </div>
            </form>

            <div class="flex items-center justify-between mt-4">
                <span class="w-3/5 border-b lg:w-1/5"></span>

                <a href="#" class="text-xs text-center text-gray-500 uppercase hover:underline">ou</a>

                <span class="w-2/5 border-b lg:w-1/5"></span>
            </div>

            <!-- <div class="flex items-center mt-6 -mx-2">
                <button
                    :disabled="isloading"
                    class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium my-auto text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
                >
                    <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                        <path
                            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                        />
                    </svg>

                    <span class="hidden mx-2 sm:inline">Sign in with Google</span>
                </button>

                <a href="#" class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-200 transform bg-gray-300 rounded-md hover:bg-gray-200">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path
                            d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
                        />
                    </svg>
                </a>
            </div>-->
            <!-- <span class="bg-blue">Se rendre au portail</span> -->
            <p class="flex mt-8 text-xs font-light text-center text-gray-400 items-center">
                <a href="#" class="font-medium text-gray-700 hover:underline">Demander à l'administrateur un compte !</a>
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
    name: "login",
    data() {
        return {
            isloading: false,
            user: { username: "", password: "", stay_connected: false },
        }
    },
    computed: {
        ...mapGetters({
            layoute: "getLayout"
        }),
        ...mapGetters('authentication', {
            token: "getToken"
        })
    },
    methods: {
        ...mapActions("authentication", ["login"]),
        ...mapActions(["changeLayout"]),
        async loger() {
            this.isloading = !this.isloading
            console.log("isloading", this.isloading);
            await this.login(this.user)
            this.$swal('Hello Vue world!!!');
            this.isloading = !this.isloading;
        },

    },
}
</script>

<style lang="css" scoped>
.spinner {
    animation: rotate 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
}
</style>