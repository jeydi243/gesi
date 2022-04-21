<template>
	<div class="card bg-white flex-row justify-items-center items-center justify-center h-full">
		<div class="flex flex-row mb-5">
			<div v-for="i in 4" :key="i" class="flex flex-col justify-start items-start">
				<span>
					<box-icon type="solid" name="circle" :color="i > step ? 'black':'green'" size="xs" class="mb-2"></box-icon>
					<template v-if="i!=4">
						<span v-for="k in 10" :key="k">-</span>
					</template>
				</span>

				<span class="text-xs">{{ i }}</span>
			</div>
		</div>

		<Transition name="fadeSlideY" mode="out-in">
			<div class="step-1 step-content" v-if="step == 1" key="step1">
				<Form class="flex flex-col w-full justify-between items-center" @submit="submitStep1" :validation-schema="step1Schema" :initial-values="step1Values" v-slot="{ isSubmitting }" @invalid-submit="onInvalidStep1">
					<h1 class="text-4xl mb-4">Informations préliminaires</h1>
					<div class="grid grid-cols-2 gap-4 auto-cols-max">
						<div class="input-group-grid name">
							<Field type="text" placeholder="Name" id="name" name="name" class="w-full form-input" />
							<ErrorMessage name="name" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid country">
							<Field name="country" id="country" as="select" class="rounded form-select block w-full">
								<option value="RDC (Congo)" selected>RDC (Congo)</option>
								<option value="Congo">Congo</option>
								<option value="Senegal">Senegal</option>
								<option value="Cote d'ivoire">Cote d'ivoire</option>
							</Field>
							<ErrorMessage name="country" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid gender">
							<Field name="gender" id="gender" as="select" class="rounded form-select block w-full" required>
								<option value selected>--Select gender--</option>
								<option value="M">Male</option>
								<option value="M">Female</option>
							</Field>
							<ErrorMessage name="gender" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid email">
							<Field name="email" type="email" id="email" placeholder="Email" class="flex form-input h-full w-full border" />
							<ErrorMessage name="email" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid birthDate">
							<Field name="birthDate" type="date" placeholder="Date of Birth" class="w-full form-input" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
							<ErrorMessage name="birthDate" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid telephone">
							<Field name="telephone" type="text" placeholder="Telephone" class="sm:text-base w-full form-input" />
							<ErrorMessage name="telephone" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid adresse col-span-2">
							<Field name="adresse" type="text" placeholder="XX, Q/quartier, C/commune, Av/avenue" class="w-full border form-input" />
							<ErrorMessage name="adresse" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
					</div>
					<div class="flex flex-row-reverse w-full h-1/2 text-black">
						<button type="submit" class="btn-primary">
							<span class="font-bold text-white">Next</span>
							<AtomSpinner class="h-4 w-4 text-white" v-if="isSubmitting" />
							<ArrowRightIcon class="h-4 w-4 text-white" v-else />
						</button>
					</div>
				</Form>
			</div>
			<div class="step-2 step-content" v-else-if="step == 2" key="step2">
				<Form class="flex flex-col mb-4 justify-between" @submit="submitStep2" :validation-schema="step2Schema" v-slot="{ isSubmitting }" :initial-values="step2Values" @invalid-submit="onInvalidStep2">
					<div class="flex flex-col mb-4 h-1/2  items-center justify-center">
						<p class="text-4xl mb-4">Photo de profil</p>
						<div class="mb-4" id="preview" @click.stop="pickPicture" :class="{'profile2':!previewSRC}">
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
					<div class="flex flex-row h-1/2 w-full items-center justify-between">
						<button class="btn-unstate" @click="step = step - 1">Back</button>
						<button type="submit" class="btn-primary">
							<span class="font-bold text-white">Suivant</span>
							<AtomSpinner class="h-4 w-4 text-white" v-if="isSubmitting" />
							<ArrowRightIcon class="h-4 w-4 text-white" v-else />
						</button>
					</div>
					<!-- {{ values }} -->
				</Form>
				<!-- <ol class="items-center sm:flex">
                <li class="relative mb-6 sm:mb-0">
                    <div class="flex items-center">
                        <div class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div class="mt-3 sm:pr-8">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                    </div>
                </li>
                <li class="relative mb-6 sm:mb-0">
                    <div class="flex items-center">
                        <div class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div class="mt-3 sm:pr-8">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.2.0</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 23, 2021</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                    </div>
                </li>
                <li class="relative mb-6 sm:mb-0">
                    <div class="flex items-center">
                        <div class="flex z-10 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <svg class="w-3 h-3 text-blue-600 dark:text-blue-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div class="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                    </div>
                    <div class="mt-3 sm:pr-8">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.3.0</h3>
                        <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2022</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
                    </div>
                </li>
                </ol>-->
			</div>
			<div class="step-3 step-content" v-else-if="step == 3" key="step3">
				<Form class="flex flex-col mb-4 justify-between items-center w-full" @submit="submitStep3" :validation-schema="step3Schema" v-slot="{ isSubmitting }" :initial-values="step3Values" @invalid-submit="onInvalidStep3">
					<h1 class="text-4xl mb-4">Add contact</h1>
					<div class="flex flex-col">
						<div class="input-group-grid name">
							<Field type="text" placeholder="Name" id="name" name="name" class="w-full form-field" />
							<ErrorMessage name="name" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid telephone">
							<Field type="text" placeholder="Téléphone" id="name" name="telephone" class="w-full form-field" />
							<ErrorMessage name="name" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid email">
							<Field type="text" placeholder="Email" id="name" name="email" class="w-full form-input" />
							<ErrorMessage name="name" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
					</div>
					<div class="flex flex-row h-1/2 w-full items-center justify-between">
						<button class="btn-unstate" @click="step = step - 1">Back</button>
						<button type="submit" class="btn-primary">
							<span class="font-bold text-white">Suivant</span>
							<ArrowRightIcon class="h-4 w-4 text-white" v-if="!isSubmitting" />
							<HollowDotsSpinner class="h-4 w-4 text-white" v-else />
						</button>
					</div>
				</Form>
			</div>
			<div class="step-4 step-content" v-else-if="step == 4" key="step4">
				<Form class="flex flex-col mb-4 justify-between items-center" @submit="submitStep4" :validation-schema="step4Schema" v-slot="{ isSubmitting }" :initial-values="step4Values" @invalid-submit="onInvalidStep4">
					<h1 class="text-4xl mb-4">Add High-School</h1>
					<div class="grid grid-cols-2 gap-2">
						<div class="input-group-grid name">
							<Field type="text" placeholder="School Name" id="name" name="name" class="w-full form-input" />
							<ErrorMessage name="name" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid telephone">
							<Field type="text" placeholder="Telephone" id="name" name="telephone" class="w-full form-input" />
							<ErrorMessage name="telephone" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid diploma">
							<Field placeholder="Diploma" v-slot="{handleChange,handleBlur}" name="diploma">
								<input type="file" name="diploma" accept=".pdf" id="diploma" @change="handleChange" @blur="handleBlur" class="text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ">
							</Field>
							<ErrorMessage name="diploma" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid adresse">
							<Field type="text" placeholder="Adresse" id="adresse" name="adresse" class="w-full form-input" />
							<ErrorMessage name="adresse" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
					</div>
					<div class="flex flex-row  w-full items-center justify-between">
						<button class="btn-unstate" @click="step = step - 1">Back</button>
						<button type="submit" class="btn-primary">
							<span class="font-bold text-white">Suivant</span>
							<ArrowRightIcon class="h-5 w-5 text-white" v-if="!isSubmitting" />
							<AtomSpinner class="h-5 w-5 text-white" v-else />
						</button>
					</div>
				</Form>
			</div>
		</Transition>
	</div>
</template>

<script>
import { UserIcon, ArrowRightIcon } from "@heroicons/vue/solid";
import { Field, Form, ErrorMessage } from "vee-validate";
import { HollowDotsSpinner } from "epic-spinners";
import { markRaw } from "vue";
import { toast } from "@/utils/utils";

import * as yup from "yup";

export default {
	name: "students-add",
	components: {
		Form,
		Field,
		ErrorMessage,
		HollowDotsSpinner,
		UserIcon,
		ArrowRightIcon,
	},
	data() {
		const step1Schema = markRaw(
			yup.object({
				name: yup.string().required(),
				country: yup.string().required(),
				telephone: yup.string().required(),
				adresse: yup.string().required(),
				email: yup.string().email().required(),
				birthDate: yup.date().min(new Date("2000-02-02"), "L'age minimum est de 18 ans"),
				gender: yup.string().default("off"),
			})
		);
		const step2Schema = {
			profile(value) {
				if (value[0] instanceof File || value[0] instanceof Blob) {
					return true;
				}
				return "Vous devez choisir une photo de profil";
			},
		};
		const step3Schema = yup.object({
			name: yup.string().required(),
			telephone: yup.number().required(),
			email: yup.string().required(),
		});
		const step4Schema = yup.object({
			name: yup.string().required(),
			telephone: yup.string().required(),
			adresse: yup.string().required(),
		});
		return {
			previewSRC: null,
			step: 4,
			step1Schema,
			step2Schema,
			step3Schema,
			step4Schema,
			step1Values: {
				name: "Kadiongo Ilunga",
				birthDate: new Date("2000-02-02"),
				gender: "M",
				email: "email@email.com",
				telephone: "+245369854",
				adresse: "20, lubumbashi Q. Mampala",
				country: "RDC (Congo)",
			},
			stepper: [{ schema: "", values: "", active: false }],
			step2Values: { profile: "" },
			step3Values: { name: "Kabondo Ndianda", email: "kabondo@email.com", telephone: "+24387747021" },
			step4Values: { name: "IT Salama", telephone: "+24381745021", adresse: "20, lubumbashi, Q/ Mamplaa" },
		};
	},
	methods: {
		pickPicture() {
			document.getElementById("bind-profile").click();
			const fi = document.getElementById("bind-profile");
			console.log(fi);
			fi.addEventListener("change", this.onProfilePictureChange);
		},
		onProfilePictureChange(event) {
			console.log("Profile picture change and is ", event.target.files[0]);
			if (event.target.files && event.target.files[0]) {
				this.previewSRC = window.URL.createObjectURL(event.target.files[0]);
				window.URL.revokeObjectURL(event.target.files[0]); // free memory
			} else {
				this.previewSRC = null;
			}
		},
		submitStep1() {
			this.goNext();
		},
		submitStep2() {
			this.goNext();
		},
		submitStep3() {
			this.goNext();
		},
		async submitStep4() {
			console.log("just submit step 4");
			toast.success("Enregistrement terminé", {
				timeout: 5000,
			});
			setTimeout(() => {
				this.$router.push("/students");
			}, 3000);

			// window.ipcRenderer.send("hello", { message: "Hello from ipc renderer" });
		},
		goNext() {
			this.step += 1;
		},
		goBack() {
			this.step -= 1;
		},
		onInvalidStep1({ values, result, errors }) {
			console.log("On invalid submit: ", { values, result, errors });
		},
		onInvalidStep2({ values, result, errors }) {
			console.log("On invalid submit: ", { values, result, errors });
		},
		onInvalidStep3({ values, result, errors }) {
			console.log("On invalid submit: ", { values, result, errors });
		},
		onInvalidStep4({ values, result, errors }) {
			console.log("On invalid submit: ", { values, result, errors });
		},
	},
};
</script>

<style lang="scss" scoped>
</style>