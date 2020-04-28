<template>
    <v-card raised rounded>
        <v-container>
            <v-row align="center" justify-md="center">
                <v-col cols="12">
                    <v-row justify="center">
                        <v-img src="@/assets/shou.jpg" alt="Avatar" max-height="150" max-width="150"
                            style="border-radius:50%;">
                        </v-img>
                    </v-row>
                </v-col>
            </v-row>
            <v-row align="center" justify-md="center">
                <!-- <v-btn class="mx-2"  dark color="indigo"> -->
                    <v-file-input dense color="blue" label="Ajouter"></v-file-input>
                <!-- </v-btn> -->
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    export default {
        name: "profile",
        data() {
            return {
                srcImg: "@/assets/shou.jpg"
            }
        }
    }
</script>

<style>

</style>