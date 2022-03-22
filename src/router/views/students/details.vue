<template>
    <div class="main flex flex-row h-full">
        <div class="flex flex-col w-1/5 h-full card mr-2 relative">
            <div class="rounded-full profile mb-2">
                <img :src="require('@/assets/img/user.png')" class="flex z-10 cursor-pointer self-center object-cover rounded-full h-[100px] w-[100px]" />
            </div>
            <span class="text-gray-700 text-center text-base mb-2">Student Name</span>
            <div class="flex flex-row justify-center mb-2 items-center">
                <div class="px-3 py-1 hover:bg-green-50 rounded-lg bg-transparent transition-all duration-700">
                    <box-icon name="phone" type="regular"></box-icon>
                </div>
                <div class="px-3 py-1 hover:bg-green-50 rounded-lg bg-transparent transition-all duration-700">
                    <box-icon name="mail-send" type="regular"></box-icon>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 auto-cols-max auto-rows-max mb-4">
                <div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max transition-all duration-700 place-items-start">
                    <span class="font-bold">Age</span>
                    <span>19</span>
                </div>
                <div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max transition-all duration-700 place-items-start">
                    <span class="font-bold">Gender</span>
                    <span>Male</span>
                </div>
                <div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max transition-all duration-700 place-items-start">
                    <span class="font-bold">Birth Date</span>
                    <span class="text-xs break-words text-ellipsis">08/12/1998</span>
                </div>
                <div class="hover:bg-green-50 rounded grid grid-cols-1 auto-cols-max transition-all duration-700 place-items-start">
                    <span class="font-bold">Adress</span>
                    <span class="text-xs break-words text-ellipsis">1, Av/Lubumbashi, Q Makomeno</span>
                </div>
            </div>
            <span class="h-[2px] bg-green-50 w-full"></span>
            <div class="flex flex-col responsables">
                <div class v-for="(item,index) in listResponsables" :key="index">{{ item }}f</div>
            </div>
            <dir class="list-document absolute bottom-0 left-0 ml-">
                <h1 class="text-center font-bold text-lg">Related documents</h1>
                <div class="document" v-for="(doc,index) in listDocuments" :key="index">
                    <box-icon :name="`file-${doc.type}`" type="solid" color="darkBlue"></box-icon>
                    <span class="truncate">{{ doc.name }}</span>

                    <box-icon name="dots-vertical-rounded" color="darkBlue" class="bg-red cursor-pointer"></box-icon>
                </div>
            </dir>
        </div>
        <div class="flex flex-col w-4/5 h-full card align-middle justify-center">
            <div class>col stats et autres</div>
            <button class="px-3 py-1" @click="back">Retour</button>
            Details de l'étudiant {{ $route.params.id }}
            <ul class="menu">
                <li>
                    <a href="#">Parent Link</a>

                    <ul>
                        <li>
                            <a href="#">Child Link</a>
                        </li>
                        <li>
                            <a href="#">Child Link</a>
                        </li>
                        <li>
                            <a href="#">Child Link</a>
                        </li>
                        <li>
                            <a href="#">Child Link</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "students-details",
    data() {
        return {
            listDocuments: [
                {
                    name: "Bonne Vie Moers",
                    type: "pdf",
                    lien: "https://www.google.com"
                },
                {
                    name: "Bulletin 5eme",
                    type: "pdf",
                    lien: "https://www.google.com"
                },
                {
                    name: "Attestation de scolarité",
                    type: "pdf",
                    lien: "https://www.google.com"
                }
            ],
            listResponsable: [
                {
                    name: "Mme. Mwanga",
                    phone: "5561217231",
                    email: "awzal@felewle.ir"
                },
                {
                    name: "Mme. Josephine",
                    phone: "3319607751",
                    email: "cemueko@job.fi"
                }]
        }
    },
    methods: {
        back() {
            this.$router.back();
        }
    }
}
</script>

<style lang="css" scoped>
.menu {
    display: block;
    margin: 0 auto;
    position: relative;
    width: 200px;
}

.menu > li > a {
    background: blue;
    color: #fff;
    display: block;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
}

.menu ul {
    background: #ddd;
    height: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    transition: all 0.5s ease;
    top: 35px;
    width: 100%;
}

.menu li:hover ul {
    height: 200px;
    opacity: 1;
    transform: translateY(0);
}

.menu ul a {
    color: #000;
    display: block;
    padding: 5px 20px;
}
</style>