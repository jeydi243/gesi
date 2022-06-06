<template>
    <div class="card">
        <Form v-slot="{ isSubmitting, values }" @onSubmit="submitEmployee" :validation-schema="employeeSchema" :initial-values="initialValueEmployee" @invalid-submit="onInvalidEmployee">
            <div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
                <div class="col mb-4 h-1/2  items-center justify-center bg-red-50">
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
                    <fieldset class="border-2 border-green-50 rounded-lg px-2 py-4">
                        <legend class="italic text-green-500 pr-3">Informations</legend>
                        <Field type="text" placeholder="First Name" id="name" name="name" class="w-full form-input" />
                        <ErrorMessage name="name" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                        <Field type="text" placeholder="Middle Name" id="middle" name="middle" class="w-full form-input" />
                        <ErrorMessage name="name" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                        <Field placeholder="Telephone" id="telephone" name="telephone" class="w-full form-input" />
                        <ErrorMessage name="telephone" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                        <Field type="text" placeholder="Birthday" id="birthday" name="birth_day" class="w-full form-input" />
                        <ErrorMessage name="birth_day" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                        <Field as="textarea" placeholder="Adress" id="adress" name="adress" class="w-full form-input" />
                        <ErrorMessage name="adress" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </fieldset>
                </div>
                <fieldset class=" border-2 border-blue-50 rounded-lg px-2 py-4">
                    <legend class="italic text-blue-400 pr-3">Education</legend>
                    <Field placeholder="School Name" id="school_name" name="school_name" class="w-full form-input" />
                    <ErrorMessage name="school_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Diploma name" id="school_diploma" name="diploma_name" class="w-full form-input" />
                    <ErrorMessage name="diploma_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>

                    <div class="row justify-center items-center">
                        <Field name="educationStart" placeholder="Start date" class="w-1/2 form-input" @focus="1 == 1" />
                        <ArrowRightIcon class="h-5 w-5 text-green-400" />
                        <Field name="educationEnd" placeholder="End date" class="  w-1/2 form-input" />
                    </div>
                    <Field v-slot="{ field }" name="school_diploma_file" class="w-full form--input">
                        <input type="file" v-bind="field" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-violet-700 hover:file:bg-violet-100 text-transparent " />
                    </Field>
                    <Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </fieldset>
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
            <div class="row-reverse">
                <button class="btn-primary" :disabled="isSubmitting" type="submit">
                    <UserIcon class="h-5 w-5 text-white mr-3" />Add Employee
                    <PixelSpinner class="h-1 w-1" :size="25" v-if="isSubmitting" />
                </button>
                <button class="btn-unstate mr-2" @click.prevent="beforeCancel(values)">Annuler</button>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { UserIcon, ArrowRightIcon } from "@heroicons/vue/solid";
import { Field, Form, ErrorMessage, useForm } from "vee-validate";
import { PixelSpinner } from 'epic-spinners'
import { toast } from "@/utils/utils";
import { compareDesc } from "date-fns"
import { isLength, isDate } from "validator"
import { ref, defineEmits } from 'vue'
const { handleSubmit } = useForm()


const cancel = defineEmits({})
var previewSRC = ref(null)
var range = ref({ start: new Date, end: new Date() })
var initialValueEmployee = { school_name: "Test school", school_diploma: "fff", school_start_date: new Date(), school_end_date: new Date(), school_diploma_file: null }
var employeeSchema = {
    school_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "School name is required" },
    school_diploma(value) { return isLength(value, { min: 2, max: 20 }) ? true : "Diploma name is required" },
    school_start_date(value) { return isDate(value) ? true : "Start date must be provided" },
    school_end_date(value) { return isDate(value) ? compareDesc(value, this.school_start_date) == 1 ? true : 'This date have' : "End date must be provided" },
    school_diploma_file(value) {
        if (value[0] instanceof File || value[0] instanceof Blob) {
            return true;
        }
        return "Vous devez choisir un fichier PDF de votre diplome";
    }
}
function pickPicture() {
    document.getElementById("bind-profile").click();
    const fi = document.getElementById("bind-profile");
    console.log(fi);
    fi.addEventListener("change", onProfilePictureChange);
}
function beforeCancel(values) {
    if (values == initialValueEmployee) emit('cancel')
    else console.log("Something in the form would you like to cancel??");
}
function onInvalidEmployee({ values, result, errors }) { console.log(errors); }
const submitEmployee = handleSubmit(async function (values) {
    try {
        var result = await this.addEmployee(values);
        if (result) { toast.success('Le monde est beau') } else {
            toast.error("Le monde n'est pas beau")
        }
    } catch (error) {
        console.log(error);
    }
})
function onProfilePictureChange(event) {
    console.log("Profile picture change and is ", event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
        previewSRC.value = window.URL.createObjectURL(event.target.files[0]);
        window.URL.revokeObjectURL(event.target.files[0]); // free memory
    } else {
        previewSRC.value = null;
    }
}
</script>