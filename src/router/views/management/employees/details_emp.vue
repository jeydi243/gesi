<template>
    <div>
        <!-- Détails de l'employée {{ $route.params }} -->
        <div class="card mt-4 min-h-[200px] relative">
            <div class="row justify-between">
                <div class="row">
                    <img src="@/assets/img/bg-1.jpg" class="rounded-lg h-[150px] w-[150px] select-none">
                    <div class="col ml-5 space-y-2">
                        <span class="capitalize font-bold text-xl">{{ userData.name }}</span>
                        <span class="font-bold text-green-600">{{ userData.position[0] }}</span>
                        <span class="italic text-sm">{{ userData.personal_email }}</span>
                        <span class="italic text-sm">{{ userData.telephones[0] }}</span>
                        <div>
                            <span class="italic text-sm font-bold">Hire Date: 28-05-2015 </span>
                            <!-- <span class="italic"> still working</span> -->
                            <span class="bg-green-100 pl-1 ml-2 pt-1 pb-1 pr-3 rounded-md font-bold"> 7 years of experience</span>
                        </div>

                        <!-- <span class="italic text-sm">{{ userData }}</span> -->
                    </div>
                </div>
                <div>
                    <button class="btn-unstate" @click="refresh"></button>
                    <button class="btn-unstate" @click="showModalDelete = true">Edit</button>
                </div>
            </div>
        </div>
        <div class="card mt-4 min-h-[200px] relative">
            <button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
                <box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
            </button>
            <span class="font-bold text-xl">Documents</span>
            <div class="row w-full justify-evenly space-x-6 a my-auto">
                <div class="col justify-items-end" v-for="(doc, index) in docs" :key="index">
                    <div class="row bg-clip-border justify-between min-w-[300px] items-center bg-green-50 h-9 rounded-md pl-2 border-dashed border-2 border-green-300 text-green-900 self-center">
                        <span class="capitalize font-bold">{{ doc.name }}</span>
                        <div class="row">
                            <span class="mr-1 underline cursor-pointer">Voir</span>
                            <a :download="doc.link" class="bg-green-900 h-8 w-8 border-2 rounded-md rounded-br-md cursor-pointer text-center" data-mdb-ripple="true" data-mdb-ripple-color="light">
                                <box-icon type="regular" name="down-arrow-alt" color="white"></box-icon>
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <!-- <a @click="changedoc()" class="text-xs italic text-blue-700 cursor-pointer">Modifier</a> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-center space-x-2 relative mt-4">
            <button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
                <box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
            </button>
            <div class="card min-h-[200px] w-1/2">
                <span class="font-bold text-xl">Biography</span>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eum laudantium libero quisquam vero quo corporis, odio fuga cumque vitae eos impedit in nisi quam tempore reprehenderit corrupti. Perspiciatis, eius?
            </div>
            <div class="card min-h-[200px] w-1/2">
                <span class="font-bold text-xl">Emergency Contact</span>
                <span v-for="(contact, index) in emergencyContacts" :key="index" class="mt-2">
                    <div class="row justify-between">
                        <span>Name: </span>
                        <span>{{ contact.name }}</span>
                    </div>
                    <div class="row justify-between">
                        <span>Relationship: </span>
                        <span>{{ contact.relationship }}</span>
                    </div>
                    <div class="row justify-between">
                        <span>Telephone: </span>
                        <span>{{ contact.phone }}</span>
                    </div>
                    <hr class="mb-2 text-green-500">
                </span>
            </div>
        </div>
        <div class="card mt-4 min-h-[200px] relative transition-all ease-in duration-700">
            <button @click="educ_state_modif = !educ_state_modif" class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
                <box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
            </button>
            <span class="font-bold text-xl">Education & Certifiactions</span>
            <ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center row md:gap-6 mt-2 transition-all ease-in duration-700" :class="{ 'border-none': educ_state_modif, 'justify-start': userData.educations.length == 1 }">
                <li v-for="({ name, start, description, end, from_school, id }, index) in userData.educations" :key="index" class="transition-all ease-in duration-700 relative" :class="{ 'border-2 border-dashed rounded-lg pl-5': educ_state_modif }">
                    <div class="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p class="text-green-500 text-sm mt-2">{{ filters.toiso(start) }} - {{ filters.toiso(end) }}</p>
                    </div>
                    <div class="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ name }}</h4>
                        {{ from_school }}
                        <p class="text-gray-500 mb-3">{{ description }}</p>
                        <button data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="showpdf(description)">Voir</button>
                    </div>
                    <button v-if="educ_state_modif" @click="deleteEducation($route.params.id, id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
                        <box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
                    </button>
                </li>
            </ol>
            <button v-if="educ_state_modif" class=" btn-unstate w-1/3 self-center mt-4" data-mdb-ripple="true" data-mdb-ripple-color="success" @click="showModalAdd = true">Add Education</button>
        </div>
        <div class="card mt-4 min-h-[200px] relative">
            <button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
                <box-icon type="regular" name="pencil" color="green" size="sm" class="h text-green-900"></box-icon>
            </button>
            <span class="font-bold text-xl">Work Experiences</span>
            <ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center md:gap-6 mt-2">
                <li v-for="({ position, start, link, end, company }, index) in work_experiences" :key="index">
                    <div class="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p class="text-green-500 text-sm mt-2">{{ start }} - {{ end }}</p>
                    </div>
                    <div class="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ position }}</h4>
                        At {{ company }}
                        <p class="text-gray-500 mb-3">Et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.</p>
                        <button data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="showpdf(link)">Voir</button>
                    </div>
                </li>
            </ol>
        </div>
        <div class="card mt-4 min-h-[200px] relative">
            <button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
                <box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
            </button>
            <span class="font-bold text-xl">Onboarding Status</span>
            <div class="col space-y-2">
                <div class="form-check form-switch">
                    <input class="toggle" type="checkbox" role="switch" id="work_tools" disabled>
                    <label class="form-check-label inline-block text-gray-800" for="work_tools">Work Tools</label>
                </div>
                <div class="form-check form-switch ">
                    <input class="toggle" type="checkbox" role="switch" id="office_tours" disabled>
                    <label class="form-check-label inline-block text-gray-800" for="office_tours">Office Tools</label>
                </div>
                <div class="form-check form-switch">
                    <input class="toggle" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled>
                    <label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault">Office Tools</label>
                </div>
            </div>
        </div>
        <MyModal v-show="showModalAdd" @close="showModalAdd = false">
            <template #header>
                <h1 class="text-4xl">
                    Add Education
                </h1>
            </template>
            <Form class="flex flex-col justify-between" @submit="addEducation" v-slot="{ isSubmitting }" :validation-schema="educationSchema" :initial-values="educationValue" @invalid-submit="onInvalidEducation">
                <div class="flex sm:flex-col md:flex-row md:justify-between">
                    <div class=" w-full">
                        <Field name="name" placeholder="Name of education" class="form-input mb-2 w-full"></Field>
                        <ErrorMessage name="name" v-slot="{ message }">
                            <p class="input-error">{{ message }}</p>
                        </ErrorMessage>
                    </div>
                </div>
                <div class="">
                    <Field name="from_school" placeholder="School from" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="from_school" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <div class="">
                    <Field name="start" type="date" placeholder="Start date" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="start" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <div class="">
                    <Field name="end" type="date" placeholder="End date" class="form-input mb-2 w-full"></Field>
                    <ErrorMessage name="end" v-slot="{ message }">
                        <p class="input-error">{{ message }}</p>
                    </ErrorMessage>
                </div>
                <Field name="description" as="textarea" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
                <ErrorMessage name="description" v-slot="{ message }">
                    <p class="input-error">{{ message }}</p>
                </ErrorMessage>
                <span class="text-red-700 text-base">{{ errorCall }}</span>

                <div class="flex flex-row h-1/2 w-full items-center justify-between">
                    <button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
                    <button type="submit" class="btn-primary">
                        <span class="font-bold text-white">Add</span>
                        <AtomSpinner class="h-4 w-4 text-white" v-if="isSubmitting" />
                    </button>
                </div>
            </Form>
        </MyModal>
        <MyModal v-show="showModalDelete" @close="showModalDelete = false">
            <template #header>
                <h1 class="text-4xl">
                    Delete employee
                </h1>
            </template>
            <div class="col">
                <span class="my-5 text-2xl">
                    Do you really want to delete this employee ?
                </span>
                <div class="row justify-between">
                    <button class="btn-unstate" @click="showModalDelete = false">Cancel</button>
                    <button class="btn-danger text-red bg-red-100" @click="deleteEmployee">Delete</button>
                </div>
            </div>
        </MyModal>
    </div>
</template>

<script setup>
import { parseISO } from "date-fns"
import { AtomSpinner } from "epic-spinners";
import { toast, goto } from "@/utils/utils";
import { isLength, isDate } from "validator"
import { onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import endpoint from "@/api/management"
import MyModal from "@/components/mymodal";
const userData = ref(null);
const showModalAdd = ref(false);
const errorCall = ref("");
const showModalDelete = ref(false);
const educ_state_modif = ref(false);

const educationValue = ref({
    from_school: 'Catalyst',
    name: "Master of science",
    start: "2018-05-05",
    end: "2020-02-02",
    description: 'La description des cours'
})
const educationSchema = ref({
    end(value) { return isDate(parseISO(value)) ? true : "End date must be provided" },
    name(value) { return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12" },
    start(value) { return isDate(parseISO(value)) ? true : "Start date must be provided" },
    from_school(value) { return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12" },
    description(value) { return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200" }
})


const docs = ref(
    [
        {
            name: 'resume',
            link: "https://resume.com",
        },
        { name: "cover_letter", link: "https://resume.com" },
        { name: "school_diploma", link: "https://resume.com" }]);

const work_experiences = ref(
    [
        {
            position: 'Game Dev',
            company: "Unilivers",
            link: "https://resume.com", start: "28-08-2014", end: "28-05-2020"
        },
        { position: "Freelance", company: "NASA", link: "https://resume.com", start: "28-08-2014", end: "28-05-2020" },
        { position: "Doctor", company: "Gecamines", link: "https://resume.com", start: "28-08-2014", end: "28-05-2020" }
    ]
);

const emergencyContacts = ref(
    [{
        name: "John Doe",
        telephone: "(709) 560-3641",
        relationship: "Father",
        email: "doe@father.js"
    },
    {
        name: "Jane Doe",
        telephone: "(965) 947-4992",
        relationship: "Mother",
        email: "jane@mother.js"
    }])
const route = useRoute()
onMounted(async () => {
    const { data } = await endpoint.employeeBy(route.params.id)
    userData.value = data[0]
})
watch(
    () => route.params.id,
    async newId => {
        const { data } = await endpoint.employeeBy(newId)
        userData.value = data[0]
    }
)
async function deleteEducation(idEmployee, educationID = "4") {
    const { status } = await endpoint.deleteEducation(idEmployee, educationID)
    if (status == 200 || status == 201) {
        toast.success(`Remove Education with id ${educationID}`)
        const index = userData.value.educations.findIndex(educ => educ.id = educationID)
        userData.value.educations.splice(index, 1)
    }
}
onBeforeRouteUpdate(async (to, from) => {
    // only fetch the user if the id changed as maybe only the query or the hash changed
    if (to.params.id !== from.params.id) {
        const { data } = await endpoint.employeeBy(to.params.id)
        userData.value = data[0]
    }
})
function showpdf(link) {
    console.log("Show pdf at link", link);
}
function closeModal() {
    showModalAdd.value = false;
}
async function refresh() {
    const { data, status } = await endpoint.employeeBy($route.params.id)
    if (status == 200 || status == 201) {
        userData.value = data[0]
    } else {
        toast.danger("Something went wrong on refreshing. Try later")
    }
}
async function deleteEmployee() {
    const { status } = await endpoint.deleteEmployee(route.params.id)
    if (status === 200 || status === 201) {
        goto()
        goto()
    }
}
async function addEducation(values) {
    console.log("Add education", values);
    const { status, data } = await endpoint.addEducation(route.params.id, values)
    if (status == 201 || status === 200) {
        showModalAdd.value = false
        toast(`Added ${values.name} to education`)
    }
}
function onInvalidEducation({ values, result, errors }) {
    console.log("Invalid education", errors);
}
</script>

<style lang="scss" scoped>
</style>