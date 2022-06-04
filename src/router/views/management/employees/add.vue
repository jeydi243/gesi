<template>
    <div class="card">
        <Form>
            <div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
                <div class="flex flex-col mb-4 h-1/2  items-center justify-center">
                    <div class="mb-4" id="preview" @click.stop="pickPicture" :class="{ 'profile2': !previewSRC }">
                        <img v-if="previewSRC" :src="previewSRC" class="flex z-10 cursor-pointer self-center object-cover rounded-lg h-[100px] w-[100px]" />
                        <UserIcon class="h-10 w-10 text-green-500" v-else />
                    </div>
                    <Field name="profile" v-slot="{ handleChange, handleBlur }">
                        <input id="bind-profile" type="file" @change="handleChange" @blur="handleBlur" class=" w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hidden" hidden />
                    </Field>
                    <ErrorMessage name="profile" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <div class="bg-red-5">
                    <fieldset>
                        <legend>Fieldset désactivé</legend>
                        <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                        <ErrorMessage name="name" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </fieldset>
                </div>
                <div class="bg-green-5">
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <div class="bg-blue-0">
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { UserIcon, ArrowRightIcon } from "@heroicons/vue/solid";
import { Field, Form, ErrorMessage } from "vee-validate";
import { HollowDotsSpinner } from "epic-spinners";
import { markRaw } from "vue";
import { toast } from "@/utils/utils";


var previewSRC = ref(null)

function pickPicture() {
    document.getElementById("bind-profile").click();
    const fi = document.getElementById("bind-profile");
    console.log(fi);
    fi.addEventListener("change", onProfilePictureChange);
}
function onProfilePictureChange(event) {
    console.log("Profile picture change and is ", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
        this.previewSRC = window.URL.createObjectURL(event.target.files[0]);
        window.URL.revokeObjectURL(event.target.files[0]); // free memory
    } else {
        this.previewSRC = null;
    }
}
</script>

<style lang="scss" scoped>
</style>