<template>
    <div class="card">
        <Form v-slot="{ isSubmitting, values }" @submit="submitEmployee" :validation-schema="employeeSchema" :initial-values="employeeValues" @invalid-submit="onInvalidEmployee">
            <div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
                <fieldset class="border-2 border-yellow-200 rounded-lg px-2 py-4">
                    <legend class="italic text-yellow-600 pr-3">Profile Picture</legend>
                    <div class="mb-4" id="preview" @click.prevent="pickFile('profile_img')" :class="{ 'profile-square': !src }">
                        <img v-if="src" :src="src" class="flex z-10 cursor-pointer self-center object-cover rounded-lg h-1/2 w-full" />
                        <UserIcon class="h-10 w-10 text-green-500" v-else />
                    </div>
                    <Field name="profile_img" v-slot="{ handleChange, handleBlur }">
                        <input id="profile_img" type="file" @change="handleChange" @blur="handleBlur" accept="image/*," class=" w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hidden" hidden />
                    </Field>
                    <ErrorMessage name="profile" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </fieldset>

                <fieldset class="border-2 border-green-50 rounded-lg px-2 py-4">
                    <legend class="italic text-green-500 pr-3">Informations</legend>
                    <Field type="text" placeholder="First Name" id="name" name="first_name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Middle Name" id="middle" name="middle_name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Last Name" id="last" name="last_name" class="w-full form-input" />
                    <ErrorMessage name="name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field placeholder="Telephone" id="telephone" name="telephone" class="w-full form-input" />
                    <ErrorMessage name="telephone" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="date" placeholder="Birthday" id="birthday" name="birthday" class="w-full form-input" />
                    <ErrorMessage name="birthday" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field as="textarea" placeholder="Adress" id="adress" name="adress" class="w-full form-input" />
                    <ErrorMessage name="adress" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </fieldset>

                <fieldset class="border-2 border-blue-50 rounded-lg px-2 py-4">
                    <legend class="italic text-blue-400 pr-3">Education</legend>
                    <Field placeholder="School Name" id="school_name" name="school_name" class="w-full form-input" />
                    <ErrorMessage name="school_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Diploma name" id="school_diploma_name" name="school_diploma_name" class="w-full form-input" />
                    <ErrorMessage name="school_diploma_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>

                    <Field name="school_start_date" type="date" placeholder="Start date" class="w-full form-input" />
                    <ErrorMessage name="school_start_date" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <!-- <ArrowRightIcon class="h-5 w-5 text-green-400" /> -->
                    <Field name="school_end_date" type="date" placeholder="End date" class="w-full form-input" />
                    <ErrorMessage name="school_end_date" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>

                    <Field v-slot="{ handleChange, handleBlur }" name="school_diploma_file">
                        <input type="file" @change="handleChange" accept=".pdf" @blur="handleBlur" class="block w-full form-file" />
                    </Field>
                    <ErrorMessage name="school_diploma_file" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </fieldset>
            </div>
            <fieldset class="border-2 border-sky-500 rounded-lg px-2 py-4">
                <legend class="italic text-yellow-600 pr-3">Applications</legend>
                <Field v-slot="{ handleChange, handleBlur }" name="resume_file" class="w-full">
                    <input type="file" @change="handleChange" accept=".pdf" @blur="handleBlur" class="w-full form-file" />
                </Field>
                <ErrorMessage name="resume_file" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
                <Field as="textarea" placeholder="Cover letter" id="cover_letter" name="cover_letter" class="w-full form-input h-56" />
                <ErrorMessage name="cover_letter" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
            </fieldset>

            <div class="row-reverse mt-5">
                <button class="btn-primary" :disabled="isSubmitting" type="submit">
                    <UserIcon class="h-5 w-5 text-white mr-3" />Add Employee
                    <PixelSpinner class="h-1 w-1" :size="25" v-if="isSubmitting" />
                </button>
                <button class="btn-unstate mr-2" @click.prevent="beforeCancel(values)">Annuler</button>
            </div>
        </Form>
    </div>
</template>

<script >
import { parseISO } from "date-fns"
import { UserIcon } from "@heroicons/vue/solid";
import { PixelSpinner } from 'epic-spinners'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import { isLength, isDate } from "validator"
import { toast, src } from "@/utils/utils";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Chance from "chance"
import { mapActions } from "vuex";
const { isLoading } = useNProgress()
const chance = new Chance()

export default {
    components: { PixelSpinner, UserIcon, Field, Form, ErrorMessage },
    emits: ['cancel'],
    data() {
        const employeeSchema = {
            first_name(value) {
                return isLength(value, { min: 2, max: 20 }) ? true : "First name must be between 2 and 20 characters"
            },
            last_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "Last name must be between 2 and 20 characters" },
            middle_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "Middle name must be between 2 and 20 characters" },
            school_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "School name is required" },
            school_end_date(value) { return isDate(parseISO(value)) ? true : "End date must be provided" },
            school_start_date(value) { return isDate(parseISO(value)) ? true : "Start date must be provided" },
            school_diploma_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "Diploma name must be between 2 and 20 characters" },
            cover_letter(value) { return isLength(value, { min: 50, max: 500 }) ? true : "Cover letter must be between 150 and 500 characters" },
            school_diploma_file(value) {
                if (value[0] instanceof File || value[0] instanceof Blob) {
                    return true;
                }
                return "Vous devez choisir un fichier PDF de votre diplome";
            },
            resume_file(value) {
                if (value[0] instanceof File || value[0] instanceof Blob) {
                    return true;
                }
                return "Vous devez choisir un fichier PDF de votre CV";
            },
            profile_img(value) {
                if (value[0] instanceof File || value[0] instanceof Blob) {
                    return true;
                }
                return "Vous devez choisir un fichier images pour votre profil";
            },

        }
        const employeeValues = {
            adress: chance.address(),
            birthday: chance.date({ year: 1995, american: false }),
            last_name: chance.last(),
            telephone: chance.phone({ country: "fr", mobile: true }),
            first_name: chance.name({ middle: false, nationality: 'en' }),
            resume_file: null,
            profile_img: null,
            school_name: 'School Maadini',
            middle_name: chance.name({ middle: false }),
            cover_letter: chance.sentence({ words: 50 }),
            school_diploma: "fff",
            school_end_date: parseISO(chance.date({ year: 2022, string: true, month: 2 })),
            school_start_date: new Date(2015, 10, 10),
            school_diploma_name: "Computer science",
            school_diploma_file: null,
        }
        return {
            employeeValues, employeeSchema, src: null
        }
    },
    methods: {
        ...mapActions(["addEmployee"]),
        beforeCancel(values) {
            if (values == initialValueEmployee.value) emit('cancel')
            else {
                if (confirm('Voulez-vous vraiment quitter ?')) this.$emit('cancel')
                console.log("Something in the form would you like to cancel??");
            }
        },
        onInvalidEmployee({ values, errors, results }) { console.log({ errors, values, results }); },
        pickFile(idInput) {
            const file_input = document.getElementById(idInput)
            file_input.click()
            file_input.addEventListener("change", this.onFileChange)
        },
        onFileChange(event) {
            if (event.target.files && event.target.files[0]) {
                this.src = window.URL.createObjectURL(event.target.files[0])
                window.URL.revokeObjectURL(event.target.files[0]) // free memory
            } else {
                this.src = null
            }
        },
        async submitEmployee(values) {
            console.log(values);
            alert("Le message est bon")
            try {
                isLoading = !isLoading
                var result = await this.addEmployee(values);
                if (result) {
                    isLoading.value = !isLoading.value
                    toast.success('Le monde est beau')
                } else {
                    toast.error("Le monde n'est pas beau")
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>