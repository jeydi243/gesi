<template>
    <div class="flex flex-row justify-center space-y-5 h-full">
        <div class="card bg-white w-[40%] min-h-[90%] justify-between">
            <span class="text-gray-800 font-bold text-2xl block text-center">Add student</span>
            <form class="flex flex-col justify-center">
                <div class="profile" id="preview" @click.stop="pickPicture">
                    <img v-if="previewSRC != null" :src="previewSRC" class="flex z-10 cursor-pointer self-center object-cover rounded-full h-[100px] w-[100px]" />
                    <box-icon name="user" color="green" v-if="previewSRC == null"></box-icon>
                    <input @change.prevent="onProfilePictureChange" type="file" id="profile_picture" class="profile_picture" hidden multiple="false" accept="image/*" />
                </div>
                <div class="input-group name">
                    <input id="name" name="name" type="text" v-model="student.name.last" placeholder="Name" class="form-input relative w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                </div>
                <div class="input-group firstName ml-4">
                    <input type="text" placeholder="First Name" id="first" v-model="student.name.first" class="flex form-input w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                </div>
                <div class="input-group middleName ml-4">
                    <input type="text" placeholder="Middle Name" id="mid" v-model="student.name.middle" class="flex form-input mb-2 sm:text-base w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                </div>
                <div class="input-group countrie">
                    <!-- <label for="countries" class="block  font-medium text-gray-900">Select your country</label> -->
                    <select name="countrySelect" id="countries" v-model="student.country" class="border form-select rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
                        <option value="RDC (Congo)" selected>RDC (Congo)</option>
                        <option value="Congo">Congo</option>
                        <option value="Senegal">Senegal</option>
                        <option value="Cote d'ivoire">Cote d'ivoire</option>
                    </select>
                </div>
                <div class="input-group gender">
                    <select name="genderSelect" v-model="student.gender" class="form-select w-full border rounded focus:border-green-400 focus:outline-none py-2 pr-2">
                        <option value="M" selected>Male</option>
                        <option value="M">Female</option>
                    </select>
                    <!-- <select type="select" placeholder="M" v-model="student.gender" class=" form-select flex form-input sm:text-base w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" /> -->
                </div>
                <div class="input-group email">
                    <input type="email" placeholder="Email" v-model="student.email" class="flex form-input form-input:bg-gray-900 h-full sm:text-base w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                </div>
                <div class="input-group birthDate">
                    <input type="date" placeholder="Date of Birth" v-model="student.birthDate" class="form-input sm:text-base w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                </div>
                <div class="input-group telephone">
                    <input type="number" placeholder="Telephone" v-model="student.telephone" class="flex form-input sm:text-base w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                </div>
                <div class="input-group adresse">
                    <input type="text" placeholder="XX, Q/quartier, C/commune, Av/avenue" v-model="student.adresse" class="form-input w-full border rounded placeholder-gray-200 focus:border-green-400 focus:outline-none py-2 pr-2" />
                    <!-- <span class="text-gray-400 text-xs p-0 m-0"></span> -->
                </div>
            </form>
            <div class="flex flex-row-reverse foot text-black justify-between">
                <button class="flex bg-green-500 px-4 py-2 rounded float-right focus:ring-green-100 focus:ring hover:bg-green-600 hover:shadow-green-100 shadow-lg">
                    <span class="font-bold text-white">Save</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: "students-add",
    data() {
        return {
            canShowMiddleName: false,
            canShowFirstName: false,
            epa: ref('eyo'),
            previewSRC: null,
            student: { name: { middle: "", last: "", first: "" }, birthDate: "", gender: "Male", email: "", telephone: "", adresse: "", country: "RDC (Congo)", profil: null }
        }
    },
    methods: {
        showMiddle() {
            if (!this.canShowMiddleName) {
                this.canShowMiddleName = !this.canShowMiddleName
                console.log("Try to request focus of middle: ", document.getElementById('mid'));
                setTimeout(() => {
                    document.getElementById('mid').focus()
                    this.student.name.last = this.student.name.last.slice(0, -1)
                }, 500);
            } else {
                console.log("No need to request focus");
            }
        },
        showFirst() {
            if (this.canShowMiddleName) {
                this.canShowFirstName = !this.canShowFirstName
                console.log("Try to request focus of first:", document.getElementById('first'));
                setTimeout(() => {
                    document.getElementById('first').focus()
                    this.student.name.middle = this.student.name.middle.slice(0, -1)
                }, 500);
            } else {
                console.log("No need to request focus");
            }
        },
        justDeleteInName() {
            console.log("You just delete some caracteres");
        },
        justDeleteInMiddle() {
            console.log("You just delete in Middle");
        },
        pickPicture() {
            document.getElementById('profile_picture').click()
        },
        onProfilePictureChange(event) {
            console.log("Profile picture change and is ", event.target.files[0]);
            if (event.target.files && event.target.files[0]) {
                this.previewSRC = window.URL.createObjectURL(event.target.files[0]);
                window.URL.revokeObjectURL(event.target.files[0]); // free memory
            } else {
                this.previewSRC = null

            }
        }
    },
}
</script>

<style lang="scss" scoped>
</style>