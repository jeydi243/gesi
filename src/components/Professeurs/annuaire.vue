<template>
    <v-container>
        <v-row>
            <v-col md="3">
                <v-card shaped elevation="12" :loading='loading'>
                    <v-img lazy-src="@/assets/logo.png" class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    <v-card-title >Kadiongo Ilunga</v-card-title>
                    <v-card-subtitle>Mathematique</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card shaped elevation="12">
                    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    <v-card-title>Kadiongo tshikanya</v-card-title>
                    <v-card-subtitle>Mathematique</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card shaped elevation="12">
                    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    <v-card-title>Mukendi Enzo</v-card-title>
                    <v-card-subtitle>Physique</v-card-subtitle>
                </v-card>
            </v-col>
            <v-col md="3">
                <v-card shaped elevation="12">
                    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"></v-img>
                    <v-card-title>Kilumba Elie</v-card-title>
                    <v-card-subtitle>Géographique</v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <inscription />
    </v-container>

</template>

<script>
    import inscrition from "@/components/Professeurs/inscription.vue"
    export default {
        name: "annuaire",
        components: {
            inscrition
        },
        data() {
            return {
                item: "un",
                loading:false
            }
        },
        methods:{
            
        }
    }
</script>

<style>

</style>