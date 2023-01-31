<template>
	<div class="card bg-white flex-row justify-items-center items-center justify-between h-full overflow-visible">
		<div class="flex flex-row w-full mb-5 justify-between bg-red-200">
			<ArrowLeftIcon class="h-5 w-5 text-blue-600" @click="goto" />
			<div v-for="i in stepper.length" :key="i" class="flex flex-col justify-center items-start">
				<span class="row justify-items-center">
					<box-icon type="solid" name="circle" :color="i > step + 1 ? 'black' : 'green'" size="xs" class="mb-2"></box-icon>
					<template v-if="i != stepper.length">
						<!-- <span v-for="k in 10" :key="k">-</span> -->
						<svg height="5" width="100">
							<line x1="0" y1="0" x2="300" y2="0" style="stroke: rgb(255, 0, 0); stroke-width: 2" />
						</svg>
					</template>
				</span>

				<span class="text-xs">{{ i }}</span>
			</div>
			<div>f</div>
		</div>
		<Form class="form grow justify-center" @submit="goNext" :validation-schema="currentSchema" :initial-values="currentValues" v-slot="{ isSubmitting, values }">
			<Transition name="fadeSlideY" mode="out-in">
				<div class="step-conten" v-if="step === 0">
					<h1 class="text-4xl mb-4">Informations préliminaires</h1>
					<div class="grid grid-cols-2 gap-4 auto-cols-max">
						<div class="input-group-grid name">
							<Field name="name" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="name" required class="input peer" />
									<label for="name" class="placeholder-label">Name </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid country">
							<Field name="country" id="country" v-slot="{ field, errorMessage }">
								<div class="relatie group">
									<select name="" class="input peer w-full" id="country" v-bind="field">
										<option value selected>Select Country</option>
										<option v-for="({ name, code }, i) in countries" :key="i" :value="code">{{ name }}</option>
									</select>
									<label for="country" class="placeholder-label">Country </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid gender">
							<Field name="gender" id="gender" as="select" class="rounded input block w-full" required>
								<option value selected>Select gender</option>
								<option value="M">Male</option>
								<option value="M">Female</option>
							</Field>
							<ErrorMessage name="gender" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid email">
							<Field name="email" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="email" required class="input peer" />
									<label for="email" class="placeholder-label">Email </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid birthDate">
							<Field name="birthdate" v-slot="{ field, errorMessage }" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
								<div class="relative group">
									<input v-bind="field" id="birthdate" required class="input peer" type="date" />
									<label for="birthdate" class="placeholder-label">Birthday </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid telephone">
							<Field name="telephone" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="telephone" required class="input peer" />
									<label for="telephone" class="placeholder-label">Telephone </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
					</div>
				</div>
				<div class="step-conten" v-else-if="step === 1">
					<h1 class="text-4xl mb-4">Address</h1>
					<div class="grid grid-cols-2 gap-4 auto-cols-max">
						<Field name="avenue" v-slot="{ field, errorMessage }">
							<div class="relative group">
								<input v-bind="field" id="avenue" required class="input peer" />
								<label for="avenue" class="placeholder-label">Avenue </label>
								<p class="input-error">{{ errorMessage }}</p>
							</div>
						</Field>

						<div class="input-group-grid country">
							<Field name="numero" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="numero" required class="input peer" />
									<label for="numero" class="placeholder-label">Code </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid gender">
							<Field name="quartier" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="quartier" required class="input peer" />
									<label for="quartier" class="placeholder-label">Quartier </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid email">
							<Field name="commune" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="commune" required class="input peer" />
									<label for="commune" class="placeholder-label">Commune </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid birthDate">
							<Field name="ville" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="ville" required class="input peer" />
									<label for="ville" class="placeholder-label">Code </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid telephone">
							<Field name="zip" v-slot="{ field, errorMessage }">
								<div class="relative group">
									<input v-bind="field" id="zip" required class="input peer" />
									<label for="zip" class="placeholder-label">Code </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
					</div>
				</div>
				<div class="step-conten" v-else-if="step === 2">
					<p class="text-4xl mb-4">Photo de profil</p>
					<div class="flex flex-col mb-4 h-1/2 items-center justify-center">
						<div class="mb-4" id="preview" @click.stop="pickPicture" :class="{ profile2: !previewSRC }">
							<img v-if="previewSRC" :src="previewSRC" class="flex z-10 cursor-pointer self-center object-cover rounded-lg h-[100px] w-[100px]" />
							<UserIcon class="h-10 w-10 text-green-500" v-else />
						</div>
						<Field name="profile" v-slot="{ handleChange, handleBlur }">
							<input id="bind-profile" type="file" @change="handleChange" @blur="handleBlur" class="w-full text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 hidden" hidden />
						</Field>
						<ErrorMessage name="profile" v-slot="{ message }">
							<p class="input-error">{{ message }}</p>
						</ErrorMessage>
					</div>
				</div>
				<div class="step-conten" v-else-if="step === 3">
					<h1 class="text-4xl mb-4">Add contact</h1>
					<div class="flex flex-col">
						<div class="input-group-grid name">
							<Field name="name" v-slot="{ field, errorMessage }">
								<div class="relative group h-10">
									<input v-bind="field" type="text" id="name" required class="input peer" />
									<label for="name" class="placeholder-label peer-invalid:text-red-600">Name </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid telephone">
							<Field name="telephone" v-slot="{ field, errorMessage }">
								<div class="relative group h-10">
									<input v-bind="field" type="text" id="telephone" required class="input peer" />
									<label for="telephone" class="placeholder-label peer-invalid:text-red-600">Telephone </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid email">
							<Field name="email" v-slot="{ field, errorMessage }">
								<div class="relative group h-10">
									<input v-bind="field" type="text" id="email" required class="input peer" />
									<label for="email" class="placeholder-label peer-invalid:text-red-600">Email</label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
					</div>
				</div>
				<div class="step-conten" v-else-if="step === 4">
					<h1 class="text-4xl mb-4">Add High-School</h1>
					<div class="grid grid-cols-2 gap-2">
						<div class="input-group-grid name">
							<Field name="name" v-slot="{ field, errorMessage }">
								<div class="relative group h-10">
									<input v-bind="field" type="text" id="name" required class="input peer" />
									<label for="name" class="placeholder-label peer-invalid:text-red-600">Name </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid telephone">
							<Field name="telephone" v-slot="{ field, errorMessage }">
								<div class="relative group h-10">
									<input v-bind="field" type="text" id="telephone" required class="input peer" />
									<label for="telephone" class="placeholder-label peer-invalid:text-red-600">Telephone </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
						<div class="input-group-grid diploma">
							<Field placeholder="Diploma" v-slot="{ handleChange, handleBlur }" name="diploma">
								<input type="file" name="diploma" accept=".pdf" id="diploma" @change="handleChange" @blur="handleBlur" class="text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
							</Field>
							<ErrorMessage name="diploma" v-slot="{ message }">
								<p class="input-error">{{ message }}</p>
							</ErrorMessage>
						</div>
						<div class="input-group-grid adresse">
							<Field name="email" v-slot="{ field, errorMessage }">
								<div class="relative group h-10">
									<input v-bind="field" type="text" id="email" required class="input peer" />
									<label for="email" class="placeholder-label peer-invalid:text-red-600">Email </label>
									<p class="input-error">{{ errorMessage }}</p>
								</div>
							</Field>
						</div>
					</div>
				</div>
			</Transition>
			{{ values }}
			<div class="bottom flex flex-row w-full items-center justify-between">
				<button class="btn-unstate" @click="goBack">Cancel</button>
				<div class="flex flex-row">
					<button class="skip btn-unstate mr-2" @click="skip" v-if="step !== 4">Skip step</button>
					<button type="submit" class="btn-primary">
						<span class="font-bold text-white"> {{ step === 4 ? "Save" : "Suivant" }}</span>
						<SaveIcon class="h-5 w-5 text-white" v-if="!isSubmitting && step === 4" />
						<ArrowRightIcon class="h-5 w-5 text-white" v-if="!isSubmitting && step !== 4" />
						<CirclesToRhombusesSpinner :size="25" :color="'#FFF'" v-if="isSubmitting" />
					</button>
				</div>
			</div>
		</Form>
	</div>
</template>

<script setup>
	import * as yup from "yup"
	import { toast, goto } from "@/utils/utils"
	import { SaveIcon, UserIcon, ArrowLeftIcon } from "@heroicons/vue/solid"
	import { markRaw, ref, computed } from "vue"
	import { Field, Form, ErrorMessage } from "vee-validate"
	import { CirclesToRhombusesSpinner } from "epic-spinners"
	import { useStudents } from "@/store/students"
	import { useConfig } from "@/store/config"

	let step = ref(0)
	const store = useStudents()
	const storeConfig = useConfig()
	const countries = computed(() => storeConfig.countries)
	const previewSRC = ref(null)
	const basicInfoSchema = markRaw(
		yup.object({
			name: yup.string().required().label("Name"),
			country: yup.string().required().label("Country"),
			telephone: yup.string().required().label("Telephones"),
			email: yup.string().email().required().label("Email"),
			birthDate: yup.date().label("Birthday"),
			gender: yup.string().default("off").label("Gebder"),
		})
	)
	const profileSchema = {
		profile: yup
			.mixed()
			.test("fileExist", "You have to specify file", (value) => value)
			.test("fileSize", "File size must be less than 5MB", (value) => value && value.size <= 5242880)
			.test("fileType", "Unsupported file type, must be JPEG or PNG", (value) => value && ["image/png", "image/jpeg"].includes(value.type)),
	}
	const addressSchema = markRaw(
		yup.object({
			avenue: yup.string().required().label("Avenue"),
			commune: yup.string().required().label("commune"),
			ville: yup.string().required().label("ville"),
			quartier: yup.string().required().label("quartier"),
			zip: yup.string().required().label("Zip"),
			numero: yup.number().required().label("Numero"),
		})
	)
	const contactSchema = yup.object({
		name: yup.string().required().label("Name"),
		telephone: yup.number().required().label("Telephone"),
		email: yup.string().required().label("Email"),
	})
	const schoolSchema = yup.object({
		name: yup.string().required().label("Name"),
		telephone: yup.string().required().label("Telephone"),
		addresse: yup.string().required().label("Telephone"),
		email: yup.string().required().label("Email"),
	})
	const studentSchema = [basicInfoSchema, addressSchema, profileSchema, contactSchema, schoolSchema]
	const stepper = computed(() => studentSchema)
	const currentSchema = computed(() => studentSchema[step.value])

	const basicInfoValues = ref({
		name: "Kadiongo Ilunga",
		birthdate: "2000-02-02",
		gender: "M",
		email: "email@email.com",
		telephone: "+245369854",
		country: "RDC (Congo)",
	})
	const profileValues = { profile: "" }
	const contactValues = { name: "Kabondo Ndianda", email: "kabondo@email.com", telephone: "+24387747021" }
	const schoolValues = { name: "IT Salama", telephone: "+24381745021", addresse: "20, lubumbashi, Q/ Mamplaa", email: "school@email.com" }
	const addressValues = { avenue: "Kawama", commune: "Bondo", ville: "Kalemie", quartier: "Baudwin", zip: 75123, numero: 5 }
	const studentValues = [basicInfoValues, addressValues, profileValues, contactValues, schoolValues]
	const currentValues = computed(() => studentValues[step.value])

	const oh = { title: "Address", schema: schoolSchema, values: schoolValues, 0: "fd" }

	function pickPicture() {
		document.getElementById("bind-profile").click()
		const fi = document.getElementById("bind-profile")
		console.log(fi)
		fi.addEventListener("change", onFileChange)
	}
	function onFileChange(event) {
		console.log("Profile picture change and is ", event.target.files[0])
		if (event.target.files && event.target.files[0]) {
			this.previewSRC = window.URL.createObjectURL(event.target.files[0])
			window.URL.revokeObjectURL(event.target.files[0]) // free memory
		} else {
			this.previewSRC = null
		}
	}
	function goNext(values) {
		if (step.value === 5) {
			console.log("Done: ", JSON.stringify(values, null, 2))
			return
		}

		step.value++
	}
	function skip() {
		if (step.value >= 4) {
			return
		}

		step.value++
	}
	function goBack() {
		if (step.value <= 0) {
			return
		}

		step.value--
	}
</script>

<style lang="scss" scoped></style>
