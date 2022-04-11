<template>
	<div class="main flex flex-row h-full">
		<div class="flex flex-col w-1/5 h-full card mr-2 relative">
			<div class="rounded-full profile mb-2">
				<img :src="require('@/assets/img/user.png')" class="flex z-10 cursor-pointer self-center object-cover rounded-full h-[100px] w-[100px]" />
			</div>
			<span class="text-gray-700 text-center text-base mb-2">Student Name</span>
			<div class="flex flex-row justify-center mb-2 items-center">
				<div class="px-3 py-1 hover:bg-green-50 rounded-lg bg-transparent transition-all duration-700">
					<a href="tel:+">
						<box-icon name="phone" type="regular"></box-icon>
					</a>
				</div>
				<div class="px-3 py-1 hover:bg-green-50 rounded-lg bg-transparent transition-all duration-700">
					<a href="mailto:">
						<box-icon name="mail-send" type="regular"></box-icon>
					</a>
				</div>
			</div>
			<div class="grid grid-cols-1 justify-items-center gap-2 auto-cols-max auto-rows-max mb-4">
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Age</span>
					<span>19</span>
				</div>
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Gender</span>
					<span>Male</span>
				</div>
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Birth Date</span>
					<span class="text-xs break-words text-ellipsis">08/12/1998</span>
				</div>
				<div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max w-full auto-rows-max transition-all duration-700 place-items-center">
					<span class="font-bold">Adress</span>
					<span class="text-xs break-words text-ellipsis">1, Av/Lubumbashi, Q Makomeno</span>
				</div>
			</div>
			<span class="h-[2px] bg-green-50 w-full"></span>
			<div class="flex flex-col responsables">
				<div class v-for="(item, index) in listResponsables" :key="index">{{ item.name }}f</div>
			</div>
			<!-- <dir class="list-document absolute bottom-0 left-1">
				<h1 class="text-center font-bold text-lg">Related documents</h1>
				<div class="document" v-for="(doc,index) in listDocuments" :key="index" @click="showModal">
					<box-icon :name="`file-${doc.type}`" type="solid" color="darkBlue"></box-icon>
					<span class="truncate">{{ doc.name }}</span>

					<box-icon name="dots-vertical-rounded" color="darkBlue" class="bg-red cursor-pointer"></box-icon>
				</div>
			</dir> -->
		</div>
		<div class="flex flex-col w-4/5 h-full card align-middle justify-start">
			<div class="flex border-b border-gray-200 mb-2">
				<button v-for="(tab,index) in tabsDetails" :key="index" class="h-10 px-4 py-2 -mb-px text-sm transition-border ease-in-out hover:border-green-500 duration-700 text-center border-b-2 sm:text-base whitespace-nowrap focus:outline-none" :class="{ 'text-green-600 border-green-500 bg-green-50 rounded-tl rounded-tr': tab.current }" @click="changeTab(index)">{{ filters.firstUpper(tab.name) }}</button>
			</div>

			<div class="contentTab">
				<Transition name="fadeSlideX">
					<KeepAlive>
						<div class="flex h-full w-full" v-if="currentComponent == 'calendrier'">
							<Calendrier />
						</div>
						<div class="flex flex-col h-1/2 w-full" v-else-if="currentComponent == 'documents'">
							<Form class="flex flex-col mb-4 justify-center items-center" @submit="addDoc" :validation-schema="docaddSchema" :initial-values="docaddValues" @invalid-submit="onInvalidStep4">
								<div class="flex flex-row">
									<select name="select-doc" id="">
										<option value="">--Please choose an option--</option>
										<option value="dog">Dog</option>
										<option value="cat">Cat</option>
										<option value="hamster">Hamster</option>
										<option value="parrot">Parrot</option>
										<option value="spider">Spider</option>
										<option value="goldfish">Goldfish</option>
									</select>
									<Field placeholder="Diploma" v-slot="{handleChange,handleBlur}" name="diploma">
										<input type="file" name="diploma" accept=".pdf" id="diploma" @change="handleChange" @blur="handleBlur" class="text-sm text-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ">
									</Field>
									<button type="submit" class="g-button-primary" @click="showFile">{{ doc.state? 'Voir':'Ajouter' }}</button>
								</div>
							</Form>

							<div class="divider"></div>
							<div v-for="(doc,index) in listDocuments" :key="index" class="flex flex-row justify-between">
								<div class="document" :class="{'document-other': !doc.state,'document':doc.state }" @click="showModal">
									<box-icon :name="`file-${doc.type}`" type="solid" color="darkBlue"></box-icon>
									<span class="truncate">{{ doc.name }}</span>

									<box-icon name="dots-vertical-rounded" color="darkBlue" class="bg-red cursor-pointer"></box-icon>
								</div>
								<div class="actions">
									<button class="g-button-primary" @click="showFile">{{ doc.state? 'Voir':'Ajouter' }}</button>
									<button class="g-button-primary" @click="modifFile">Modifier</button>
								</div>
							</div>
						</div>
					</KeepAlive>
				</Transition>
			</div>
		</div>
		<vue-final-modal v-model="canshowModal" @click-outside="clickOutside" @before-open="beforeOpen" @opened="opened" classes="flex justify-center items-center" content-class="relative flex flex-col max-h-full rounded bg-white">
			<template #title>Events Example!</template>
			<div class="dropdown">
				<span href="#" class="dropdown-item" @click="modifFile">Modifier le fichier</span>
				<span href="#" class="dropdown-item" @click="showFile">Voir le fichier</span>
			</div>
		</vue-final-modal>
	</div>
</template>

<script>
import Calendrier from "@/components/calendar.vue";
export default {
	name: "students-details",
	components: {
		Calendrier,
	},
	data() {
		return {
			canshowModal: false,
			listDocuments: [
				{
					name: "Certificat d'aptitude physique",
					type: "pdf",
					state: true,
					lien: "https://www.google.com",
				},
				{
					name: "Bonne Vie Moers",
					type: "pdf",
					state: true,
					lien: "https://www.google.com",
				},
				{
					name: "Bulletin 5eme",
					type: "pdf",
					state: false,
					lien: "https://www.google.com",
				},
				{
					name: "Attestation de scolarité",
					type: "pdf",
					state: true,
					lien: "https://www.google.com",
				},
				{
					name: "Bulletin 6eme",
					type: "pdf",
					state: true,
					lien: "https://www.google.com",
				},
			],
			listResponsables: [
				{
					name: "Mme. Mwanga",
					phone: "5561217231",
					email: "awzal@felewle.ir",
				},
				{
					name: "Mme. Josephine",
					phone: "3319607751",
					email: "cemueko@job.fi",
				},
			],
			tabsDetails: [
				{ name: "Calendrier", current: false },
				{ name: "Documents", current: true },
			],
		};
	},
	computed: {
		currentComponent() {
			return this.tabsDetails.find((tab) => tab.current).name.toLowerCase();
		},
	},
	methods: {
		back() {
			this.$router.back();
		},
		showModal() {
			this.canshowModal = !this.canshowModal;
		},
		clickOutside() {
			// alert("click-outside");
		},
		beforeOpen() {
			// alert("beforeOpen");
		},
		opened() {
			// alert("opened");
		},
		modifFile() {
			// alert("closed");
		},
		showFile() {
			// alert("closed");
		},
		addDoc() {
			// alert("closed");
		},
		changeTab(index) {
			var currentTrue = this.tabsDetails.findIndex((tab) => tab.current);
			this.tabsDetails[currentTrue].current = false;
			this.tabsDetails[index].current = true;
		},
	},
};
</script>

<style lang="css" scoped>
</style>