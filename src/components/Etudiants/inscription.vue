<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="3">
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="Nom" required>
                    </v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="lastname"  :rules="nameRules" :counter="10" label="Post-nom" required>
                    </v-text-field>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="3">
                    <img src="@/assets/logo.png" alt="Avatar" style="width:100%">
                </v-col>

            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-text-field v-model="nickname" :rules="nameRules" label="Prenom" required></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>

            </v-row>
            <v-row>
                <v-col md="2">
                    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" ref="menu"
                        offset-y>
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="date" label="Date de naissance" readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker ref="picker" v-model="date" :max="new Date().toISOString().substr(0, 10)"
                            min="1996-01-01" @change="save"></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col md="2">
                    <v-select :items="genres" filled label="Genre" dense></v-select>
                </v-col>
                <v-col md="3">
                    <v-text-field v-model="responsableNom" label="Nom responsable"></v-text-field>
                </v-col>
                <v-col md="2">
                    <v-text-field v-model="responsableNumero" label="Numero responsable" v-show="again1"></v-text-field>
                </v-col>
                <v-col md="2">
                    <v-text-field v-model="responsableEmail" label="Email responsable" v-show="again2"></v-text-field>
                </v-col>

                <v-col md="2">
                    <v-text-field v-model="tel" label="Telephone" :rules="telRules" @change="affiche"></v-text-field>
                </v-col>
                <v-col md="2">
                    <v-text-field v-model="adresse" label="Adresse"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        name: "inscription",
        data() {
            return {
                responsableNom: "",
                responsableNumero: "",
                responsableEmail: "",
                again1: false,
                again2: false,
                date: null,
                valid: false,
                menu: false,
                genres: ["M", "F"],
                adresse: "",
                anneeInscription: new Date().getFullYear().toString(),
                tel: '',
                firstname: '',
                nickname: '',
                lastname: '',
                telRules: [v => !!v || 'Ce champ est obligatoire'],
                nameRules: [
                    v => !!v || 'Ce champ  est obligatoire',
                    v => v.length <= 10 || '10 caracteres au plus sont permis',
                ],
                email: '',
                emailRules: [
                    v => !!v || "l'email est obligatoire",
                    v => /.+@.+/.test(v) || "l'Email doit etre valide",
                ],
            }
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
        methods: {
            save(date) {
                this.$refs.menu.save(date)
            },
            affiche() {
                console.log("la methode afficher a été appelé ");
            }
        },
    }
</script>

<style>
    img {
        border-radius: 50%;
    }
</style>