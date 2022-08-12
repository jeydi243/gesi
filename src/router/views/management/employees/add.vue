<template>
    <div class="card">
        <Form v-slot="{ isSubmitting, values }" @submit="submitEmployee" :validation-schema="employeeSchema" :initial-values="employeeValues" @invalid-submit="onInvalidEmployee">
            <div class="grid grid-cols-3 gap-4 auto-cols-min w-full h-full">
                <fieldset class="border-2 block col border-yellow-200 rounded-lg px-2 py-4 items-center align-middle justify-center content-center">
                    <legend class="italic text-yellow-600 pr-3">Profile Picture</legend>
                    <div class="mb-4 h-1/2" id="preview" @click.prevent="pickFile('profile_img')" :class="{ 'profile-square': !src }">
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
                    <ErrorMessage name="first_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Middle Name" id="middle" name="middle_name" class="w-full form-input" />
                    <ErrorMessage name="middle_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="text" placeholder="Last Name" id="last" name="last_name" class="w-full form-input" />
                    <ErrorMessage name="last_name" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field placeholder="Phone number comma separated" id="telephones" name="telephones" class="w-full form-input" />
                    <ErrorMessage name="telephones" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="date" placeholder="Birthday" id="birthday" name="birthday" class="w-full form-input" />
                    <ErrorMessage name="birthday" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field type="email" placeholder="Personal Email" id="personal_email" name="personal_email" class="w-full form-input" />
                    <ErrorMessage name="personal_email" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field as="select" placeholder="Gender" id="gender" name="gender" class="block w-full form-select">
                        <option value="M" selected>Male</option>
                        <option value="F">Female</option>
                    </Field>
                    <ErrorMessage name="gender" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                    <Field as="textarea" placeholder="Address" id="address" name="address" class="w-full form-input" />
                    <ErrorMessage name="address" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>

                    <Field name="cityzenship" id="cityzenship" as="select" class="form-select block w-full">
                        <option value="CD" selected>RDC (Congo)</option>
                        <option value="Congo">Congo</option>
                        <option value="SEN">Senegal</option>
                        <option value="COD">Cote d'ivoire</option>
                    </Field>
                    <ErrorMessage name="cityzenship" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </fieldset>
                <div>
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
                        <Field name="domain" type="text" placeholder="Domain Tag" class="w-full form-input" />
                        <ErrorMessage name="domain" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </fieldset>
                    <fieldset class="border-2 border-blue-50 rounded-lg px-2 py-4">
                        <legend class="italic text-blue-400 pr-3">Hire</legend>
                        <Field name="hire_date" type="date" placeholder="Hire date" class="w-full form-input" />
                        <ErrorMessage name="hire_date" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                        <Field name="skills" placeholder="Skills" class="w-full form-input" />
                        <ErrorMessage name="skills" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </fieldset>
                </div>
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
                <Field placeholder="Position" id="position" name="position" class="w-full form-input" />
                <ErrorMessage name="cover_letter" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
            </fieldset>

            <div class="row-reverse mt-5">
                <button class="btn-primary" :disabled="isSubmitting" type="submit">
                    <UserIcon class="h-5 w-5 text-white mr-3" />Add employee
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
import { isLength, isDate, isEmail } from "validator"
import { toast, src } from "@/utils/utils";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as Chance from "chance"
import { mapActions } from "pinia";
// const { isLoading } = useNProgress()
const chance = new Chance()

export default {
    components: { PixelSpinner, UserIcon, Field, Form, ErrorMessage },
    emits: ['cancel'],
    data() {
        const employeeSchema = {
            first_name(value) {
                return isLength(value, { min: 2, max: 20 }) ? true : "First name must be between 2 and 20 characters"
            },
            gender(value) { return value == 'M' || value == "F" ? true : "Must be F or M" },
            personal_email(value) { return isEmail(value) ? true : "Must be valid Email" },
            address(value) { return isLength(value, { min: 2, max: 200 }) ? true : "Address must be between 2 and 200 characters" },
            position(value) { return isLength(value, { min: 2, max: 50 }) ? true : "Position must be between 2 and 50 characters" },
            skills(value) { return isLength(value, { min: 2, max: 50 }) ? true : "Skils must be between 2 and 50 characters" },
            telephones(value) { return isLength(value, { min: 10 }) ? true : "telephones must be 10 characters or more" },
            cityzenship(value) { return isLength(value, { min: 2, max: 2 }) ? true : "cityzenship must be 2 characters" },
            last_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "Last name must be between 2 and 20 characters" },
            middle_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "Middle name must be between 2 and 20 characters" },
            school_name(value) { return isLength(value, { min: 2, max: 20 }) ? true : "School name is required" },
            domain(value) { return isLength(value, { min: 2, max: 20 }) ? true : "domain must be provided" },
            school_end_date(value) { return isDate(parseISO(value)) ? true : "End date must be provided" },
            hire_date(value) { return isDate(parseISO(value)) ? true : "Hire date must be provided" },
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
            address: chance.address(),
            birthday: "1999-10-10",
            first_name: chance.name({ middle: false, nationality: 'en' }),
            middle_name: chance.name({ middle: false }),
            last_name: chance.last(),
            telephones: chance.phone({ country: "fr", mobile: true }),
            resume_file: 'null',
            profile_img: 'null',
            personal_email: chance.email(),
            cityzenship: 'FR',
            domain: 'Math',
            skills: 'Code, kadiong',
            gender: 'M',
            position: "Developer",
            school_name: 'School Maadini',
            cover_letter: chance.sentence({ words: 50 }),
            school_end_date: "2014-02-06",
            hire_date: "2019-10-10",
            school_start_date: "2010-08-02",
            school_diploma_name: "Computer science",
            school_diploma_file: 'null',
        }
        return {
            employeeValues, employeeSchema, src: null, isLoading: false
        }
    },
    methods: {
        ...mapActions("management", ["addEmployee"]),
        beforeCancel(values) {
            if (values == this.employeeValues) { this.$router.back() }
            else {
                this.$router.back()
            }
        },
        onInvalidEmployee({ values, errors, results }) { console.log({ errors }); },
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
            const employee = new FormData()
            values['name'] = values['first_name'] + " " + values['middle_name'] + " " + values['last_name']
            values['resume_file'] = values['resume_file'][0]
            values['school_diploma_file'] = values['school_diploma_file'][0]
            values['profile_img'] = values['profile_img'][0]
            values['telephones'] = values['telephones'].split(',').map(tel => tel.replaceAll(" ", ""))
            delete values['first_name']
            delete values['middle_name']
            delete values['last_name']


            const { resume_file, school_diploma_file, profile_img, ...other } = values
            values['employee'] = other
            values['resume_file'] = resume_file
            values['school_diploma_file'] = school_diploma_file
            values['profile_img'] = profile_img


            // employee.append("resume_file", resume_file)
            // employee.append("school_diploma_file", school_diploma_file)
            // employee.append("profile_img", profile_img)
            // employee.append('employee', other)

            console.log(other);
            for (const key in other) {
                employee.append(key, other[key])
            }



            try {
                this.isLoading = !this.isLoading
                var result = await this.addEmployee(other);
                if (result) {
                    this.isLoading = !this.isLoading
                    toast.success('Employee added successfully !')
                    this.$router.back()
                } else {
                    toast.error(`Error:  ${result}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>