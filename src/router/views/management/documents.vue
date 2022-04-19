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
					<tr>
						<th>#</th>
						<th>Code</th>
						<th>Name</th>
						<th>Description</th>
						<th>Action</th>
						<!-- <th v-for="(head,index) in getListDocuments" :key="index">{{head}}</th> -->
					</tr>
				</thead>
				<tbody>
					<tr v-for="(doc,index) in getListDocuments" :key="index">
						<td>{{ index+1 }}</td>
						<td>{{ doc.code }}</td>
						<td class="font-bold">{{ doc.name }}</td>
						<td>{{ doc.description }}</td>
						<td class="relative"><button @click="dropdown = !dropdown" id="toggle-dropdown">Modifier</button>
							<div id="dropdown" class="dropdown" v-if="dropdown && index">
								<span href="#" class="dropdown-item" @click="modifyDoc(doc.code)">Modify</span>
								<span class="dropdown-separator"></span>
								<span href="#" class="dropdown-item-sensible" @click="softdeleteDoc(doc.code)">Delete</span>
								<span href="#" class="dropdown-item-sensible" @click="removeDoc(doc.code)">Remove</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<Modal name="example" v-model="canshowModal" transition="fadeSlideY" @click-outside="clickOutside" classes="modal" content-class="modal-content">
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
				</ErrorMessage>
				<div class="flex flex-row h-1/2 items-center justify-between">
					<button class="bg-green-50 text-green-800 rounded w-24 self-center" @click="clickOutside">Annuler</button>
					<button type="submit" class="btn-primary">
						<PlusIcon class="h-5 w-5 text-white" v-if="!isSubmitting" />
						<span class="font-bold text-white">Ajouter</span>
						<AtomSpinner class="h-5 w-5 text-white" v-if="isSubmitting" />
					</button>
				</div>
			</Form>
			<span class="text-red-700 text-base">{{ errorCall }}</span>
		</Modal>
	</div>
</template>

<script >
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import { AtomSpinner } from "epic-spinners";
import { PlusIcon, SearchIcon } from "@heroicons/vue/solid";
import * as yup from "yup";
import { useToast } from "vue-toastification";
var toast = useToast();
export default {
	name: "documents",
	components: {
		Form,
		AtomSpinner,
		ErrorMessage,
		SearchIcon,
		PlusIcon,
		Field,
	},
	data() {
		var docSchema = yup.object({
			name: yup.string().required(),
			code: yup.string().required(),
			description: yup.string().required(),
		});
		return { dropdown: false, search: "", canshowModal: false, docSchema, initialDocValue: { name: "Bulletin 5eme secondaire", code: "AX-2022", description: "" } };
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
		modifyDoc(code) {
			var res = this.updateDocument(code);
			toast.success("Document modifié avec succes");
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
			this.canshowModal = !this.canshowModal;
		},
	},
};
</script>

<style lang="scss" scoped>
</style>