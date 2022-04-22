<template>
	<div>
		<div class="card h-1/5">
			<span class="text-2xl font-bold pb-5">Liste des documents</span>
			<p class="text-base pb-4">Laboris sint irure culpa elit pariatur adipisicing ullamco. Exercitation occaecat commodo duis esse id laborum ut incididunt ipsum eiusmod mollit culpa veniam nisi. Mollit Lorem labore et voluptate sit laboris occaecat sit. Ut non do cillum cillum voluptate tempor consectetur. Labore sunt incididunt nulla elit aliquip dolore enim. Enim sint anim sit ullamco dolor sunt adipisicing laboris aute in.</p>
			<div class="flex flex-row justify-between pb-2">
				<div class="relative flex w-72 flex-wrap items-stretch">
					<span class="z-10 flex h-full font-normal text-center self-center caret-green-500 text-gray-300 absolute bg-transparent rounded text-base items-center justify-center ">
						<SearchIcon class="h-5 w-5 self-center text-center text-gray-500" />
					</span>
					<input type="text" v-model="search" placeholder="Find by Code or Name" class="px-1 py-3 caret-green-500 placeholder-gray-300 text-gray-600 relative bg-white rounded text-sm border-0 outline-none focus:outline-none focus:ring-transparent w-full pl-7" />
				</div>
				<button @click="canshowModal =! canshowModal" class="btn-primary">
					<PlusIcon class="h-5 w-5 text-white" />Add
				</button>
			</div>
			<table class="table-auto">
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
					<tr v-for="(doc,index) in getListDocuments" :key="index" class="table-row">
						<div>
							<td>{{ index+1 }}</td>
							<td>{{ doc.code }}</td>
							<td class="font-bold">{{ doc.name }}</td>
							<td>{{ doc.description }}</td>
							<td class="relative flex flex-row items-center align-middle">
								<ClipboardIcon href="#" class="h-5 w-5 text-blue-500 m-4 bg-blue-50 cursor-pointer" @click="showModalUpdate =!showModalUpdate" />
								<!-- <PlusIcon href="#" class="" @click="softdeleteDoc(doc.code)" />Delete</PlusIcon> -->
								<TrashIcon href="#" class="h-5 w-5 text-red-500 m-4 bg-red-50 cursor-pointer" @click="removeDoc(doc.code)" />
							</td>
						</div>
						
					</tr>
				</tbody>
			</table>
		</div>
		<Modal name="modal-add" v-model="canshowModal" @click-outside="clickOutside" transition="fadeSlideY" classes="modal" content-class="modal-content">
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
					<button class="btn-unstate" @click="clickOutside">Annuler</button>
					<button type="submit" class="btn-primary">
						<PlusIcon class="h-4 w-4 text-white" v-if="!isSubmitting" />
						<span class="font-bold text-white">Ajouter</span>
						<AtomSpinner class="h-4 w-4 text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
			<span class="text-red-700 text-base">{{ errorCall }}</span>
		</Modal>
		<Modal name="modalmodif" v-model="showModalUpdate" @click-outside="clickOutsideModif" transition="fade" classes="modal" content-class="modal-content">
			<template #title>Add document </template>
			<Form class="flex flex-col form-input" @submit="addDocument" :validation-schema="docSchema" v-slot="{ isSubmitting }" :initial-values="initialDocValue" @invalid-submit="onInvalidDocument">
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
				</ErrorMessage><span class="text-red-700 text-base">{{ errorCall }}</span>
				<div class="flex flex-row h-1/2 w-full items-center justify-between">
					<button class="btn-unstate" @click="clickOutside">Cancel</button>
					<button type="submit" class="btn-primary">
						<span class="font-bold text-white">Update</span>
						<AtomSpinner class="h-4 w-4 text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
		</Modal>
	</div>
</template>

<script >
import * as yup from "yup";
import { toast } from "@/utils/utils";
import { AtomSpinner } from "epic-spinners";
import { mapGetters, mapActions } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import { PlusIcon, SearchIcon, TrashIcon, ClipboardIcon } from "@heroicons/vue/solid";

export default {
	name: "documents",
	components: {
		Form,
		AtomSpinner,
		ErrorMessage,
		ClipboardIcon,
		SearchIcon,
		TrashIcon,
		PlusIcon,
		Field,
	},
	data() {
		var docSchema = yup.object({
			name: yup.string().required(),
			code: yup.string().required(),
			description: yup.string().required(),
		});
		return { showModalUpdate: false, dropdown: false, search: "", canshowModal: false, docSchema, initialDocValue: { name: "Bulletin 5eme secondaire", code: "AX-2022", description: "" } };
	},
	computed: { ...mapGetters("management", ["getListDocuments", "errorCall"]) },
	created() {
		window.onclick = (e) => {
			if (e.target.id !== "toggle-dropdown" && this.dropdown) {
				this.dropdown = false;
			}
		};
	},
	methods: {
		...mapActions("management", ["addDocument", "deleteDocument", "removeDocument", "updateDocument"]),
		onInvalidDocument({ values, result, errors }) {
			console.log(errors);
		},
		async modifyDoc(code) {
			await this.$vfm.toggle("modalmodif", { value: "key" });
			console.log(code);
			// var res = this.updateDocument(code);
			// toast.success("Document modifié avec succes");
		},
		softdeleteDoc(code) {
			var res = this.deleteDocument(code);
			if (res) {
				toast.success("Successfully softdelete document");
			}
			toast.error("Error on soft delete");
		},
		removeDoc(code) {
			var res = this.removeDocument(code);
			if (res) {
				toast.success("Successfully remove document");
			}
			toast.error("Can't remove this document");
		},
		async add(values) {
			var response = this.addDocument(values);
			if (response) {
				setTimeout(() => {
					this.canshowModal = !this.canshowModal;
				}, 2000);
				toast.success("Document ajouté avec succès", {
					timeout: 5000,
				});
			}
			toast.error("Erreur lors de l'ajout du document");
		},
		clickOutside() {
			this.canshowModal = false;
		},
		clickOutsideModif() {
			this.showModalUpdate = false;
		},
	},
};
</script>

<style lang="scss" scoped>
</style>