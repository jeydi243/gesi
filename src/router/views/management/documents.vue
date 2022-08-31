<template>
	<div>
		<div class="card h-1/5">
			<div class="row justify-between mb-4">
				<span class="text-4xl font-bold border-0 border-l-4 border-l-yellow-400 pl-2">Documents</span>
				<button @click="showModalAdd = !showModalAdd" class="btn-primary"><DocumentAddIcon class="h-5 w-5 text-white" />Add document</button>
			</div>

			<p class="text-base pb-4">
				Laboris sint irure culpa elit pariatur adipisicing ullamco. Exercitation occaecat commodo duis esse id laborum ut incididunt ipsum eiusmod mollit culpa veniam nisi. Mollit Lorem labore et voluptate sit laboris occaecat sit. Ut non do cillum cillum voluptate tempor consectetur. Labore sunt incididunt nulla elit aliquip dolore enim. Enim sint
				anim sit ullamco dolor sunt adipisicing laboris aute in.
			</p>
			<div class="flex flex-row justify-between pb-2">
				<div class="relative flex w-72 flex-wrap items-stretch">
					<span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center">
						<SearchIcon class="h-5 w-5 self-center text-center text-gray-500" />
					</span>
					<input type="text" v-model="search" placeholder="Find by Code or Name" class="px-1 py-3 caret-green-500 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:ring-transparent w-full pl-7" />
				</div>
			</div>
			<table class="table-auto md:table-fixed">
				<thead>
					<tr class="table-row">
						<th>#</th>
						<th>Code</th>
						<th>Name</th>
						<th>Description</th>
						<th>Action</th>
						<!-- <th v-for="(head,index) in getListDocuments" :key="index">{{head}}</th> -->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(doc, indexDoc) in getListDocuments" :key="indexDoc" :id="`heading${indexDoc}`" class="mb-0 table-row">
						<td class="table-cell">{{ indexDoc + 1 }}</td>
						<td class="table-cell">{{ doc.code }}</td>
						<td class="table-cell font-bold">{{ doc.name }}</td>
						<td class="table-cell">{{ doc.description }}</td>
						<td class="table-cell relative flex-row items-center">
							<div class="flex flex-row">
								<ClipboardIcon href="#" class="h-4 w-4 text-blue-500 m-4 bg-blue-50 cursor-pointer" @click="showModif(indexDoc, doc)" />
								<TrashIcon href="#" class="h-4 w-4 text-red-500 m-4 bg-red-50 cursor-pointer" @click="removeDoc(doc._id)" />
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<MyModal v-show="showModalUpdate" @close="closeModal">
			<template #header>
				<h1 class="text-4xl">Modifier ce document</h1>
			</template>
			<Form class="flex flex-col justify-between" @submit="updateDoc" v-slot="{ isSubmitting }" :validation-schema="docSchema" :initial-values="initialDocValue" @invalid-submit="onInvalidDocument">
				<div class="flex sm:flex-col md:flex-row">
					<Field name="name" placeholder="name" class="form-input mb-2"></Field>
					<ErrorMessage name="name" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
				</div>
				<Field name="description" as="textarea" placeholder="Describe the utility of this doc" class="form-textarea mb-4"></Field>
				<ErrorMessage name="description" v-slot="{ message }">
					<p class="input-error">{{ message }}</p>
				</ErrorMessage>
				<span class="text-red-700 text-base">{{ errorCall }}</span>

				<div class="flex flex-row h-1/2 w-full items-center justify-between">
					<button class="btn-unstate" @click.prevent.stop="closeModal">Annuler</button>
					<button type="submit" class="btn-primary">
						<span class="font-bold text-white">Mettre à jour</span>
						<CirclesToRhombusesSpinner :size="5" color="#FFF" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</MyModal>

		<Modal name="modaladd" v-model="showModalAdd" @click-outside="clickOutside" transition="fadeSlideY" classes="modal" content-class="modal-content">
			<template #title>Add document </template>
			<Form class="flex flex-col" @submit="addDocument" :validation-schema="docSchema" v-slot="{ isSubmitting }" :initial-values="initialDocValue" @invalid-submit="onInvalidDocument">
				<div class="flex sm:flex-col md:flex-row">
					<Field name="code" placeholder="code" class="form-input"></Field>
					<ErrorMessage name="code" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
					<Field name="name" placeholder="name" class="form-input"></Field>
					<ErrorMessage name="name" v-slot="{ message }">
						<p class="input-error">{{ message }}</p>
					</ErrorMessage>
				</div>
				<Field name="description" as="textarea" placeholder="Describe the utility of this doc" class="form-textarea"></Field>
				<ErrorMessage name="description" v-slot="{ message }">
					<p class="input-error">{{ message }}</p>
				</ErrorMessage>
				<div class="flex flex-row h-1/2 w-full items-center justify-between">
					<button class="btn-unstate" @click.stop="clickOutside">Annuler</button>
					<button type="submit" class="btn-primary">
						<PlusIcon class="h-4 w-4 text-white" v-if="!isSubmitting" />
						<span class="font-bold text-white">Ajouter</span>
						<CirclesToRhombusesSpinner :size="5" class="text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
			<span class="text-red-700 text-base">{{ errorCall }}</span>
		</Modal>
	</div>
</template>

<script>
	import MyModal from "@/components/mymodal"
	import { useManagement } from "@/store/management"
	import * as yup from "yup"
	import { toast } from "@/utils/utils"
	import { CirclesToRhombusesSpinner } from "epic-spinners"
	import { mapState, mapActions } from "pinia"
	import { Form, Field, ErrorMessage } from "vee-validate"
	import { PlusIcon, SearchIcon, TrashIcon, ClipboardIcon, DocumentAddIcon } from "@heroicons/vue/solid"

	export default {
		name: "index-documents",
		components: {
			Form,
			CirclesToRhombusesSpinner,
			ErrorMessage,
			ClipboardIcon,
			SearchIcon,
			DocumentAddIcon,
			TrashIcon,
			PlusIcon,
			Field,
			MyModal,
		},
		data() {
			var docSchema = yup.object({
				name: yup.string().required(),
				code: yup.string().required(),
				description: yup.string().required(),
			})
			return {
				showModalUpdate: false,
				dropdown: false,
				search: "",
				showModalAdd: false,
				docSchema,
				initialDocValue: { name: "Bulletin 5eme secondaire", code: "AX-2022", description: "" },
			}
		},
		computed: { ...mapState(useManagement, ["getListDocuments", "errorCall"]) },
		created() {
			window.onclick = (e) => {
				if (e.target.id !== "toggle-dropdown" && this.dropdown) {
					this.dropdown = false
				}
			}
		},
		methods: {
			...mapActions("management", ["addDocument", "deleteDocument", "removeDocument", "updateDocument"]),
			onInvalidDocument({ values, result, errors }) {
				console.log(errors)
			},
			async updateDoc(values, { resetForm }) {
				var res = await this.updateDocument(values)
				if (res) {
					toast.success("Document modifié avec succes")
				} else {
					this.closeModal()
					resetForm()
				}
			},
			async softdeleteDoc(code) {
				var res = await this.deleteDocument(code)
				if (res) {
					toast.success("Successfully softdelete document")
				} else {
					toast.error("Error on soft delete")
				}
			},
			async removeDoc(id) {
				var res = await this.removeDocument(id)
				if (res) {
					toast.success("Successfully remove document")
				} else {
					toast.error("Can't remove this document")
				}
			},
			async add(values, { resetForm }) {
				var response = this.addDocument(values)
				if (response) {
					setTimeout(() => {
						this.showModalAdd = !this.showModalAdd
					}, 2000)
					toast.success("Document ajouté avec succès", {
						timeout: 5000,
					})
				} else {
					toast.error("Erreur lors de l'ajout du document")
				}
				resetForm()
			},
			clickOutside() {
				this.showModalAdd = false
			},
			closeModal() {
				this.showModalUpdate = false
			},
			showModif(index, values) {
				this.showModalUpdate = !this.showModalUpdate
				var currentTrue = this.getListDocuments.findIndex((tab) => tab.show == true)
				this.initialDocValue = values
				if (currentTrue != -1) {
					if (currentTrue != index) {
						console.log(`SO ${currentTrue} is != 1 and ${index} is != ${currentTrue}`)
						this.getListDocuments[currentTrue].show = false
						this.getListDocuments[index].show = true
					} else {
						console.log("You click the same item")
						this.getListDocuments[index].show = false
					}
				} else {
					console.log("Nothing was True ....")
					this.getListDocuments[index].show = true
				}
			},
		},
	}
</script>

<style scoped>
	.form-textarea {
		overflow: hidden;
	}
</style>
