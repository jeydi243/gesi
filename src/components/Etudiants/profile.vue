<template>
    <v-card raised shaped>
        <v-container>
            <v-row align="center" justify="center">
                <v-col cols="12">
                    <v-row justify="center">
                        <v-img src="@/assets/shou.jpg" alt="Avatar" max-height="150" max-width="150"
                            style="border-radius:50%;margin-right:-35px">
                        </v-img>
                        <v-btn class="mx-2" fab dark color="indigo" style="margin-left:-55px;">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>

                    </v-row>
                </v-col>
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