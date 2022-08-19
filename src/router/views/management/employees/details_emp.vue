<template>
	<div>
		<!-- Détails de l'employée {{ $route.params }} -->
		<div class="card mt-4 min-h-[200px] relative">
			<div class="row justify-between">
				<div class="row">
					<img src="@/assets/img/bg-1.jpg" class="rounded-lg h-[150px] w-[150px] select-none" />
					<div class="col ml-5 space-y-2">
						<span class="capitalize font-bold text-xl">{{ userData.name }}</span>
						<span class="font-bold text-green-600">{{ userData.position[0] }}</span>
						<span class="italic text-sm">{{ userData.personal_email }}</span>
						<span class="italic text-sm">{{ userData.telephones[0] }}</span>
						<span class="bg-green-100 pl-1 pt-1 pb-1 pr-3 rounded-md font-bold">7 years of experience</span>
						<!-- <div>
							<span class="italic text-sm font-bold">Hire Date: 28-05-2015 </span>
							 <span class="italic"> still working</span>
						</div> -->

						<!-- <span class="italic text-sm">{{ userData }}</span> -->
					</div>
				</div>
				<div>
					<button class="btn-unstate" @click="refresh">Refresh</button>
					<button class="btn-unstate" @click="showModalDeleteEmployee = true">Edit</button>
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
			<button @click="contact_state_modif = !contact_state_modif" class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
				<box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
			</button>
			<div class="card min-h-[200px] w-1/2">
				<span class="font-bold text-xl">Biography</span>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus eum laudantium libero quisquam vero quo corporis, odio fuga cumque vitae eos impedit in nisi quam tempore reprehenderit corrupti. Perspiciatis, eius?
			</div>
			<div class="card min-h-[200px] w-1/2 col justify-cente">
				<span class="font-bold text-xl">Emergency Contact</span>
				<span v-for="(contact, index) in userData.emergencyContacts" :key="index" class="mt-2 relative transition-all ease-in duration-700" :class="{ 'rounded-lg border-2': contact_state_modif }">
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
						<span>{{ contact.telephone }}</span>
					</div>
					<hr class="mb-2 text-green-500" v-if="!contact_state_modif" />
					<button v-if="contact_state_modif" @click="deleteContact(contact.id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
						<box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
					</button>
				</span>
				<button @click="showModalAddContact = true" class="btn-unstate" v-if="contact_state_modif" data-mdb-ripple="true" data-mdb-ripple-color="success">Add</button>
			</div>
		</div>
		<div class="card mt-4 min-h-[200px] relative transition-all ease-in duration-700">
			<button @click="educ_state_modif = !educ_state_modif" class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
				<box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
			</button>
			<span class="font-bold text-xl">Education & Certifiactions</span>
			<ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-start row md:gap-6 mt-2 transition-all ease-in duration-700" :class="{ 'border-none': educ_state_modif, 'md:justify-start': userData.educations.length == 1 }">
				<!--  -->
				<li v-for="({ name, start, description, end, from_school, id }, index) in userData.educations" :key="index" class="transition-all ease-in duration-700 relative" :class="{ 'border-2 border-dashed rounded-lg pl-5': educ_state_modif }">
					<div class="flex md:block flex-start items-center pt-2 md:pt-0">
						<div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
						<p class="text-green-500 text-sm mt-2">{{ filters.toiso(start) }} - {{ filters.toiso(end) }}</p>
					</div>
					<div class="mt-0.5 ml-4 md:ml-0 pb-5">
						<h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ name }}</h4>
						{{ from_school }}
						<p class="text-gray-500 mb-3">{{ description }}</p>
						<button v-if="educ_state_modif" data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="launchUpdateEducation(id)">Update</button>
					</div>
					<button v-if="educ_state_modif" @click="deleteEducation(id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
						<box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
					</button>
				</li>
			</ol>
			<button v-if="educ_state_modif" class="btn-unstate w-1/3 self-center mt-4" data-mdb-ripple="true" data-mdb-ripple-color="success" @click="showModalAddEducation = true">Add Education</button>
		</div>
		<div class="card mt-4 min-h-[200px] relative">
			<button @click="exper_state_modif = !exper_state_modif" class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
				<box-icon type="regular" name="pencil" color="green" size="sm" class="h text-green-900"></box-icon>
			</button>
			<span class="font-bold text-xl">Work Experiences</span>
			<ol class="border-l md:border-l-0 md:border-t border-gray-300 md:flex md:justify-start md:gap-6 mt-2" :class="{ 'border-none': exper_state_modif, 'md:justify-start': userData.experiences.length == 1 }">
				<!--  -->
				<li v-for="({ position, start, end, company, id }, index) in userData.experiences" :key="index" class="relative" :class="{ 'border-2 border-dashed rounded-lg pl-5': exper_state_modif }">
					<div class="flex md:block flex-start items-center pt-2 md:pt-0">
						<div class="bg-green-300 w-2 h-2 rounded-full -ml-1 md:ml-0 mr-3 md:mr-0 md:-mt-1"></div>
						<p class="text-green-500 text-sm mt-2">{{ filters.toiso(start) }} - {{ filters.toiso(end) }}</p>
					</div>
					<div class="mt-0.5 ml-4 md:ml-0 pb-5">
						<h4 class="text-green-800 font-semibold text-xl mb-1.5">{{ position }}</h4>
						At {{ company }}
						<p class="text-gray-500 mb-3">Et elementum lorem ornare. Maecenas placerat facilisis mollis.</p>
						<button v-if="exper_state_modif" data-mdb-ripple="true" data-mdb-ripple-color="success" type="button" class="btn-unstate-min w-[80px]" @click="launchUpdateExperience(id)">Update</button>
					</div>
					<button v-if="exper_state_modif" @click="deleteExperience(id)" class="absolute inline-block bottom-0 right-0 text-center items-center row bg-red-100 rounded-tl-md rounded-br-sm" data-mdb-ripple="true" data-mdb-ripple-color="danger">
						<box-icon type="regular" name="trash" color="red" size="sm" class="text-green-900"></box-icon>
					</button>
				</li>
				<button v-if="exper_state_modif" class="btn-unstate w-1/3 self-center mt-4" data-mdb-ripple="true" data-mdb-ripple-color="success" @click="showModalAddExper = true">Add Experience</button>
			</ol>
		</div>
		<div class="card mt-4 min-h-[200px] relative">
			<button class="absolute inline-block top-0 right-0 text-center items-center row bg-green-100 rounded-bl-md rounded-tr-sm" data-mdb-ripple="true" data-mdb-ripple-color="success">
				<box-icon type="regular" name="pencil" color="green" size="sm" class="text-green-900"></box-icon>
			</button>
			<span class="font-bold text-xl">Onboarding Status</span>
			<div class="col space-y-2">
				<div class="form-check form-switch">
					<input class="toggle" type="checkbox" role="switch" id="work_tools" disabled />
					<label class="form-check-label inline-block text-gray-800" for="work_tools">Work Tools</label>
				</div>
				<div class="form-check form-switch">
					<input class="toggle" type="checkbox" role="switch" id="office_tours" disabled />
					<label class="form-check-label inline-block text-gray-800" for="office_tours">Office Tools</label>
				</div>
				<div class="form-check form-switch">
					<input class="toggle" type="checkbox" role="switch" id="flexSwitchCheckDefault" disabled />
					<label class="form-check-label inline-block text-gray-800" for="flexSwitchCheckDefault">Office Tools</label>
				</div>
			</div>
		</div>

		<MyModal v-show="showModalAddEducation" @close="showModalAddEducation = false">
			<template #header>
				<h1 class="text-4xl">Add Education</h1>
			</template>
			<Form class="flex flex-col justify-between" @submit="addEducation" v-slot="{ isSubmitting }" :validation-schema="educationSchema" :initial-values="educationValue" @invalid-submit="onInvalidEducation">
				<div class="flex sm:flex-col md:flex-row md:justify-between">
					<div class="w-full">
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
						<span class="font-bold text-white" v-if="!isSubmitting">Add</span>
						<CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>
		<MyModal v-show="showModalAddContact" @close="showModalAddContact = false">
			<template #header>
				<h1 class="text-4xl">Add Contact</h1>
			</template>
			<Form class="flex flex-col justify-between" @submit="addContact" v-slot="{ isSubmitting }" :validation-schema="contactSchema" :initial-values="contactValue" @invalid-submit="onInvalidContact">
				<div class="flex sm:flex-col md:flex-row md:justify-between">
					<div class="w-full">
						<Field name="name" placeholder="Name of contact" class="form-input mb-2 w-full"></Field>
						<ErrorMessage name="name" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
					</div>
				</div>
				<div class="">
					<Field name="email" placeholder="School from" class="form-input mb-2 w-full"></Field>
					<ErrorMessage name="email" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
				</div>
				<Field placeholder="Phone number comma separated" id="telephone" name="telephones" class="w-full form-input" />
				<ErrorMessage name="telephone" v-slot="{ message }">
					<p class="input-error">{{ message }}</p>
				</ErrorMessage>
				<Field name="relationship" placeholder="Describe your experience in this field of education" class="form-textarea mb-4"></Field>
				<ErrorMessage name="relationship" v-slot="{ message }">
					<p class="input-error">{{ message }}</p>
				</ErrorMessage>
				<span class="text-red-700 text-base">{{ errorCall }}</span>

				<div class="flex flex-row h-1/2 w-full items-center justify-between">
					<button class="btn-unstate" @click.prevent.stop="closeModal">Cancel</button>
					<button type="submit" class="btn-primary">
						<span class="font-bold text-white" v-if="!isSubmitting">Add</span>
						<CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>
		<MyModal v-show="showModalAddExper" @close="showModalAddExper = false">
			<template #header>
				<h1 class="text-4xl">Add Experience</h1>
			</template>
			<Form class="flex flex-col justify-between" @submit="addExperience" v-slot="{ isSubmitting }" :validation-schema="experienceSchema" :initial-values="experienceValue" @invalid-submit="onInvalidEducation">
				<div class="flex sm:flex-col md:flex-row md:justify-between">
					<div class="w-full">
						<Field name="position" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
						<ErrorMessage name="position" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
					</div>
				</div>
				<div class="">
					<Field name="company" placeholder="Name of company" class="form-input mb-2 w-full"></Field>
					<ErrorMessage name="company" v-slot="{ message }">
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
						<span class="font-bold text-white" v-if="!isSubmitting">Add</span>
						<CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>
		<MyModal v-show="showModalUpdateExper" @close="showModalUpdateExper = false">
			<template #header>
				<h1 class="text-4xl">Update Experience</h1>
			</template>
			<Form class="flex flex-col justify-between" @submit="updateExperience" v-slot="{ isSubmitting }" :validation-schema="experienceSchema" :initial-values="experienceValue" @invalid-submit="onInvalidExperience">
				<div class="flex sm:flex-col md:flex-row md:justify-between">
					<div class="w-full">
						<Field name="position" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
						<ErrorMessage name="position" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
					</div>
				</div>
				<div class="">
					<Field name="company" placeholder="Name of company" class="form-input mb-2 w-full"></Field>
					<ErrorMessage name="company" v-slot="{ message }">
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
						<span class="font-bold text-white" v-if="!isSubmitting">Update</span>
						<CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>
		<MyModal v-show="showModalUpdateEducation" @close="showModalUpdateEducation = false">
			<template #header>
				<h1 class="text-4xl">Update Education</h1>
			</template>
			<Form class="flex flex-col justify-between" @submit="updateEducation" v-slot="{ isSubmitting }" :validation-schema="educationSchema" :initial-values="educationValue" @invalid-submit="onInvalidEducation">
				<div class="flex sm:flex-col md:flex-row md:justify-between">
					<div class="w-full">
						<Field name="position" placeholder="Position at company" class="form-input mb-2 w-full"></Field>
						<ErrorMessage name="position" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
					</div>
				</div>
				<div class="">
					<Field name="company" placeholder="Name of company" class="form-input mb-2 w-full"></Field>
					<ErrorMessage name="company" v-slot="{ message }">
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
						<span class="font-bold text-white" v-if="!isSubmitting">Update</span>
						<CirclesToRhombusesSpinner :size="25" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>
		<MyModal v-show="showModalDeleteEmployee" @close="showModalDeleteEmployee = false">
			<template #header>
				<h1 class="text-4xl">Delete employee</h1>
			</template>
			<div class="col">
				<span class="my-5 text-2xl"> Do you really want to delete this employee ? </span>
				<div class="row justify-between">
					<button class="btn-unstate" @click="showModalDeleteEmployee = false">Cancel</button>
					<button class="btn-danger text-red bg-red-100" @click="deleteEmployee">Delete</button>
				</div>
			</div>
		</MyModal>
	</div>
</template>

<script setup>
	import { useRoute } from "vue-router"
	import { parseISO } from "date-fns"
	import { ref, computed } from "vue"
	import { useManagement } from "@/store/management"
	import { toast, goto, chance } from "@/utils/utils"
	import { onBeforeRouteUpdate } from "vue-router"
	import { isLength, isDate, isEmail } from "validator"
	import { CirclesToRhombusesSpinner } from "epic-spinners"
	import { Form, Field, ErrorMessage } from "vee-validate"
	import MyModal from "@/components/mymodal"
	import user from "../../../../api/user"

	const errorCall = ref("")
	const educ_state_modif = ref(false)
	const showModalAddExper = ref(false)
	const exper_state_modif = ref(false)
	const showModalAddContact = ref(false)
	const contact_state_modif = ref(false)
	const showModalUpdateExper = ref(false)
	const showModalAddEducation = ref(false)
	const showModalDeleteEmployee = ref(false)
	const showModalUpdateEducation = ref(false)
	const store = useManagement()
	const route = useRoute()
	const userData = computed(() => store.employees.find((emp) => emp._id == route.params.id))

	onBeforeRouteUpdate(async (to, from) => {
		if (to.params.id !== from.params.id) {
			const result = await store.employeeBy(to.params.id)
			if (result) {
				toast("Route id changed to %s...", to.params.id)
			} else {
				toast.danger("Something went wrong on refreshing. Try later")
			}
		}
	})
	const contactSchema = ref({
		name(value) {
			return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
		},
		telephone(value) {
			return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 20"
		},
		email(value) {
			return isEmail(value) ? true : "Un email valide est attendu"
		},
		relationship(value) {
			return isLength(value, { min: 3, max: 20 }) ? true : "Le minimum de caracteres est 3 et le maximum 20"
		},
	})
	const contactValue = ref({
		name: chance.last(),
		telephone: chance.phone({ country: "fr", mobile: true }),
		email: chance.email(),
		relationship: "Father",
	})
	const educationValue = ref({
		from_school: "Catalyst",
		name: "Master of science",
		start: "2018-05-05",
		end: "2020-02-02",
		description: "La description des cours",
	})
	const experienceValue = ref({
		company: "Google",
		position: "Frontend developer",
		start: "2018-05-05",
		end: "2020-02-02",
		description: "La description de ton experience",
	})
	const educationSchema = ref({
		end(value) {
			return isDate(parseISO(value)) ? true : "End date must be provided"
		},
		name(value) {
			return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
		},
		start(value) {
			return isDate(parseISO(value)) ? true : "Start date must be provided"
		},
		from_school(value) {
			return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
		},
		description(value) {
			return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200"
		},
	})
	const experienceSchema = ref({
		position(value) {
			return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
		},
		start(value) {
			return isDate(parseISO(value)) ? true : "Start date must be provided"
		},
		end(value) {
			return isDate(parseISO(value)) ? true : "End date must be provided"
		},
		company(value) {
			return isLength(value, { min: 6, max: 20 }) ? true : "Le minimum de caracteres est 6 et le maximum 12"
		},
		description(value) {
			return isLength(value, { min: 3, max: 200 }) ? true : "Le minimum de caracteres est 2 et le maximum 200"
		},
	})
	const docs = ref([
		{
			name: "resume",
			link: "https://resume.com",
		},
		{ name: "cover_letter", link: "https://resume.com" },
		{ name: "school_diploma", link: "https://resume.com" },
	])
	const experiences = ref([
		{
			position: "Game Dev",
			description: "",
			company: "Unilivers",
			start: "28-08-2014",
			end: "28-05-2020",
		},
		{ position: "Freelance", description: "", company: "NASA", start: "28-08-2014", end: "28-05-2020" },
		{ position: "Doctor", description: "", company: "Gecamines", start: "28-08-2014", end: "28-05-2020" },
	])

	async function deleteEducation(educationID = "4") {
		const result = await store.deleteEducation(route.params.id, educationID)
		if (result) {
			closeModal()
			toast.success(`Remove Education with id ${educationID}`)
		} else {
			toast.error("Can't delete education for this employee")
		}
	}
	async function deleteContact(contactID = "4") {
		const result = await store.deleteContact(route.params.id, contactID)
		if (result) {
			closeModal()
			toast.success(`Remove Contact with id ${contactID}`)
		} else {
			toast.error("Can't delete education for this employee")
		}
	}
	async function deleteExperience(experienceID = "4") {
		const result = await store.deleteExperience(route.params.id, experienceID)
		if (result) {
			closeModal()
			toast.success(`Remove Experience with id ${experienceID}`)
		} else {
			toast.error("Can't delete experience for this employee")
		}
	}
	async function launchUpdateExperience(experienceID = "4") {
		const ud = userData.value["experiences"].find((exp) => exp.id == experienceID)
		experienceValue.value = ud
		showModalUpdateExper.value = true
	}
	async function launchUpdateEducation(educationID = 4) {
		const ud = userData.value["educations"].find((edu) => edu.id == educationID)
		console.log({ ...ud })
		educationValue.value = { ...ud }
		showModalUpdateEducation.value = true
	}
	async function updateExperience(updatedExperience) {
		try {
			const result = await store.updateExperience(route.params.id, experienceValue.value.id, updatedExperience)
			if (result) {
				closeModal()
				toast.success(`Update Experience with id ${experienceValue.value.id}`)
			} else {
				toast.error("Can't update experience for this employee")
			}
		} catch (error) {
			console.log(error)
		}
	}
	async function updateEducation(updatedEducation) {
		try {
			const result = await store.updateEducation(route.params.id, educationValue.value.id, updatedEducation)
			if (result) {
				closeModal()
				toast.success(`Update education with id ${educationValue.value.id}`)
			} else {
				toast.error("Can't update education for this employee")
			}
		} catch (error) {
			console.log(error)
		}
	}
	async function refresh() {
		const result = await store.employeeBy(route.params.id)
		if (result) {
			closeModal()
			toast(`Refreshed...`)
		} else {
			toast.danger("Something went wrong on refreshing. Try later")
		}
	}
	async function deleteEmployee() {
		const { status } = await store.deleteEmployee(route.params.id)
		if (status === 200 || status === 201) {
			goto()
			goto()
		}
	}
	async function addEducation(values) {
		const result = await store.addEducation(route.params.id, values)
		if (result) {
			closeModal()
			toast(`Added ${values.name} to education`)
		} else {
			toast.error("Impossible d'ajouter une education a cette employee")
		}
	}
	async function addExperience(values) {
		const result = await store.addExperience(route.params.id, values)
		if (result) {
			closeModal()
			toast(`Added ${values.name} to experience ${result}`)
		} else {
			toast.error("Impossible d'ajouter une experience a cette employee", result)
		}
	}
	async function addContact(values) {
		const result = await store.addEmergencyContact(route.params.id, values)
		if (result) {
			closeModal()
			toast(`Added ${contactValue.value.name} to contacts`)
		} else {
			toast.error("Impossible d'ajouter un contact a cette employee")
		}
	}

	function showpdf(link) {
		console.log("Show pdf at link", link)
	}
	function closeModal() {
		educ_state_modif.value = false
		exper_state_modif.value = false
		contact_state_modif.value = false
		showModalAddExper.value = false
		showModalUpdateExper.value = false
		showModalAddContact.value = false
		showModalAddEducation.value = false
		showModalDeleteEmployee.value = false
		showModalUpdateEducation.value = false
	}
	function onInvalidEducation({ values, result, errors }) {
		console.log("Invalid education", errors)
	}
	function onInvalidExperience({ values, result, errors }) {
		console.log("Invalid experience", errors)
	}
	function onInvalidContact({ values, result, errors }) {
		console.log("Invalid experience", errors)
	}
</script>

<style lang="scss" scoped></style>
