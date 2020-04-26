<template>
    <v-container>
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
                loading: false
            }
        },
        methods: {

        }
    }
</script>

<style>

</style>