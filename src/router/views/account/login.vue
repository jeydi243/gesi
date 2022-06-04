<template>
    <div class="flex flex-row justify-center h-full bg-gray-100 relative">
        <div class="absolute top-0 left-0 h-full w-full z-1">
            <img src="@/assets/img/pattern.png" class="h-full w-full object-cover" />
        </div>
        <div class="w-full z-3 max-w-sm p-3 flex flex-col h-[70%] justify-center self-center bg-white rounded-md shadow-md font-k2d">
            <h1 class="flex text-3xl font-semibold self-center text-center text-green-500">GESI</h1>
            <Form class="mt-6 col transition-all duration-700" @submit="submitForm" :validation-schema="loginSchema" :initial-values="user" v-slot="{ isSubmitting }" @invalid-submit="onInvalidSubmit">
                <div class="col">
                    <label for="username" class="text-sm text-gray-800 flex">Username</label>
                    <Field
                           name="username"
                           :placeholder="`e.g: ${placeholderSuggestion[forAanime.atat]}`"
                           autocomplete="name"
                           class="flex w-full px-2 py-1 mt-2 bg-gray-100 border-b-blue-500 autofill:bg-yellow-200 text-gray-700 rounded-md focus:ring-green-50 focus:outline-none placeholder:text-gray-50 placeholder:italic placeholder:text-slate-200" />
                    <ErrorMessage id="usernameError" name="username" class="text-red-700 text-xs" />
                </div>
                <div class="col mt-4">
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm text-gray-800">Mot de passe</label>
                        <a href="#" class="text-xs text-green-600 hover:underline">Mot de passe oublié ?</a>
                    </div>
                    <Field
                           name="password"
                           placeholder="*******"
                           autocomplete="current-password"
                           type="password"
                           class="block w-full border-b-1 border-green-500 px-2 py-1 mt-2 text-gray-700 bg-gray-100 rounded-md focus:border-green-500 focus:outline-none focus:ring-green-50 placeholder:italic placeholder:text-slate-400" />
                    <ErrorMessage id="passwordError" name="password" class="text-red-700 text-xs" />
                </div>

                <div class="flex items-center mb-4 mt-2">
                    <Field id="check" name="stay_connected" type="checkbox" as="checkbox" class="w-4 h-4 indeterminate:bg-gray-100 accent-green-500 checked:accent-green-500 checked:focus:accent-green-500 default:bg-gray-100 rounded text-gray-100" />
                    <label for="check" class="ml-1 text-sm font-medium text-gray-900">Rester connecté ?</label>
                </div>

                <div class="row mt-6">
                    <PixelSpinner :animation-duration="1000" :size="25" :color="'#fff'" v-if="isSubmitting" class="flex" />
                    <button type="submit" class="btn-primary">
                        <span class="text-base text-center flex">Connexion</span>
                    </button>
                </div>

                <!-- <div class="flex items-center justify-between mt-4">
                    <span class="w-3/5 border-b lg:w-1/5"></span>

                    <a href="#" class="text-xs text-center text-gray-500 uppercase hover:no-underline">ou</a>

                    <span class="w-2/5 border-b lg:w-1/5"></span>
                </div>-->
                <div class="flex text-xs items-center justify-center" id="authresponse">
                    <pre>{{ authresponse }}</pre>
                    <!-- {{ !authresponse ? '' : authresponse[0] }} -->
                    <!-- <a href="#" class="text-base text-red-700 text-center hover:no-underline"></a> -->
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import { gsap, Elastic } from 'gsap';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { AtomSpinner, PixelSpinner } from 'epic-spinners'
import * as yup from 'yup';
import anime from 'animejs/lib/anime.es.js';
export default {
    name: "login",
    components: {
        // 'atom-spinner': AtomSpinner,
        PixelSpinner, ErrorMessage,
        Field,
        Form,
    },
    data() {
        const loginSchema = yup.object({
            username: yup.string().required(),
            password: yup.string().required().min(8),
            stay_connected: yup.string().default('off')
        });
        return {
            isloading: false,
            placeholderSuggestion: ["17ki2022", "18gk2022", "55gk20", "18gk2024", "202218gk", "18gk2041", "18gk2022", "18gk1022", "18gk2022"],
            forAanime: { atat: 0, },
            user: { username: "rootuser", password: "rootpass", stay_connected: "on" },
            loginSchema,

        }
    },
    computed: {
        ...mapGetters({
            layoute: "getLayout"
        }),
        ...mapGetters('authentication', {
            token: "getToken",
            authresponse: "getAuthResponse",
        }),
        LengthplaceholderSuggestion() {
            return this.placeholderSuggestion.length
        },

    },
    watch: {
        token(newavalue, oldvalue) {
            if (newavalue) {
                this.$router.push('/')
            }
        }
    },
    created() {
        anime({
            targets: this.forAanime,
            atat: function () {
                return anime.random(0, 5);
            },
            easing: 'linear',
            round: 1,
            duration: 5000,
            update: function () {
                // console.log("OKAY. Ca change")
            }
        });
    },
    methods: {
        ...mapActions("authentication", ["login"]),
        ...mapActions(["changeLayout"]),
        async loger() {
            this.isloading = !this.isloading
            // console.log("isloading", this.isloading);
            setTimeout(() => {
                this.login(this.user)// this.$swal('Hello Vue world!!!');
                gsap.fromTo('#authresponse', {
                    opacity: 0,
                    y: -10
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: Elastic.easeOut.config(1, 0.3)
                })
                this.isloading = !this.isloading;
            }, 2000);

        },
        async submitForm(user) {
            console.log("Submit form with vlues: ", user);
            // Submit values to API...
            // alert(JSON.stringify(user, null, 2));
            try {
                this.isloading = !this.isloading
                await this.login(user)
                this.isloading = !this.isloading
            } catch (e) {
                console.log(e);
            }

        },
        onInvalidSubmit({ errors }) {
            console.log("Invalid submit");
            for (const key in errors) {
                var el = document.getElementById(`${key}Error`);
                gsap.to(el, 0.1, { x: "+=5", yoyo: true, repeat: 5 },);
                gsap.to(el, 0.1, { x: "-=5", yoyo: true, repeat: 5 });
            }
        },

    },
}
</script>

<style lang="css" scoped>
::placeholder {
    color: #c2bebe;
    font-style: italic;
    transition: all 0.7s ease;
    transform: rotateX(20px);
}
</style>