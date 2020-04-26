<template>
    <v-container>
        <inscription />
    </v-container>

</template>

<script>
    import inscription from "@/components/Professeurs/inscription.vue"
    
    export default {
        name: "annuaire",
        components: {
            inscription
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