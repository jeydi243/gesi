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
			<dir class="list-document absolute bottom-0 left-1">
				<h1 class="text-center font-bold text-lg">Related documents</h1>
				<div class="document" v-for="(doc,index) in listDocuments" :key="index" @click="showModal">
					<box-icon :name="`file-${doc.type}`" type="solid" color="darkBlue"></box-icon>
					<span class="truncate">{{ doc.name }}</span>

					<box-icon name="dots-vertical-rounded" color="darkBlue" class="bg-red cursor-pointer"></box-icon>
				</div>
			</dir>
			<vue-final-modal v-model="canshowModal" @click-outside="clickOutside" @before-open="beforeOpen" @opened="opened" @before-close="beforeClose" @closed="closed" classes="flex justify-center items-center" content-class="relative flex flex-col max-h-full mx-4 p-4 rounded bg-white">
				<template #title>Events Example!</template>
				<div class="dropdown">
					<span href="#" class="dropdown-item" @click="goto('profile')">Modifier le fichier</span>
					<span href="#" class="dropdown-item" @click="goto('index-settings')">Voir le fichier</span>
				</div>

				<!-- <span class="dropdown-separator"></span>
				<span href="#" class="dropdown-item-sensible" @click="goto('login')">Sign Out</span> -->
			</vue-final-modal>
		</div>
		<div class="flex flex-col w-4/5 h-full card align-middle justify-start">
			<h1 class="text-2xl font-bold mb-2">Calendrier de {{ $route.params.id }}</h1>
			<div class="flex h-1/2 w-full">
				<calendar />
			</div>
		</div>
	</div>
</template>

<script>
import calendar from "@/components/calendar.vue";
export default {
	name: "students-details",
	components: {
		calendar,
	},
	data() {
		return {
			canshowModal: false,
			listDocuments: [
				{
					name: "Bonne Vie Moers",
					type: "pdf",
					lien: "https://www.google.com",
				},
				{
					name: "Bulletin 5eme",
					type: "pdf",
					lien: "https://www.google.com",
				},
				{
					name: "Attestation de scolarité",
					type: "pdf",
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
		};
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
		beforeClose() {
			// alert("beforeClose");
		},
		closed() {
			// alert("closed");
		},
	},
};
</script>

<style lang="css" scoped>
</style>