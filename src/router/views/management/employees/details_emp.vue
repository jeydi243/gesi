<template>
    <div>
        <!-- Détails de l'employée {{ $route.params }} -->
        <div class="card mt-4 min-h-[200px] relative">
            <div class="row justify-between">
                <div class="row">
                    <img src="@/assets/img/bg-1.jpg" class="rounded-lg h-[150px] w-[150px]">
                    <div class="col ml-5">
                        <span class="capitalize font-bold text-xl">{{ userData.name }}</span>
                        <span class="font-bold text-green-600">{{ userData.position[0] }}</span>
                        <!-- <span class="italic text-sm">{{ userData.email }}</span> -->
                        <span class="italic text-sm">{{ userData.personal_email }}</span>
                        <span class="italic text-sm">{{ userData.telephones[0] }}</span>
                        <div>
                            <span class="italic text-sm font-bold">Hire Date: 28-05-2015 </span><span class="italic"> still working</span>
                            <span class="bg-green-100 pl-1 ml-2 pt-1 pb-1 pr-3 rounded-md font-bold"> 7 years of experience</span>
                        </div>

                        <!-- <span class="italic text-sm">{{ userData }}</span> -->
                    </div>
                </div>
                <div>
                    <button class="btn-unstate">Editer</button>
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
                        <a @click="changedoc()" class="text-xs italic text-blue-700 cursor-pointer">Modifier</a>
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
        <div class="card mt-4 min-h-[200px] relative">
            <button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
                <box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
            </button>
            <span class="font-bold text-xl">Education & Certifiactions</span>
            <ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-center md:gap-6 mt-2">
                <li v-for="({ name, start, link, end, from_school }, index) in educations" :key="index">
                    <div class="flex md:block flex-start items-center pt-2 md:pt-0">
                        <div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
                        <p class="text-green-500 text-sm mt-2">{{ start }} - {{ end }}</p>
                    </div>
                    <div class="mt-0.5 ml-4 md:ml-0 pb-5">
                        <h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ name }}</h4>
                        {{ from_school }}
                        <p class="text-gray-500 mb-3">Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.</p>
                        <button data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="showpdf(link)">Voir</button>
                    </div>
                </li>
            </ol>
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
            <div class="col">
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
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import endpoint from "@/api/management"
const userData = ref(null);


const docs = ref(
    [
        {
            name: 'resume',
            link: "https://resume.com",

        },
        { name: "cover_letter", link: "https://resume.com" },
        { name: "school_diploma", link: "https://resume.com" }]);

const educations = ref(
    [
        {
            name: 'Bachelor of Science',
            from_school: "UNILU",
            link: "https://resume.com", start: "28-08-2014", end: "28-05-2020"
        },
        { name: "Master of Science", from_school: "UPL", link: "https://resume.com", start: "28-08-2014", end: "28-05-2020" },
        { name: "Doctor of Science", from_school: "Salama", link: "https://resume.com", start: "28-08-2014", end: "28-05-2020" }
    ]
);
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
        phone: "(709) 560-3641",
        relationship: "Father",
        email: "doe@father.js"
    },
    {
        name: "Jane Doe",
        phone: "(965) 947-4992",
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
</script>

<style lang="scss" scoped>
</style>