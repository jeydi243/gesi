<template>
    <v-container>
        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" editable>Informations de Base</v-stepper-step>
            <v-stepper-content step="1">
                <v-container fluid>
                    <v-row>
                        <v-col md="8">
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="Nom"
                                            required filled></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="lastname" :rules="nameRules" :counter="10"
                                            label="Post-nom" required filled></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="nickname" :rules="nameRules" label="Prenom" required
                                            filled></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="tel" :rules="telRules" label="Numero de telephone"
                                            required filled></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-select v-model="titre" label="Titre" :items="titres" required filled>
                                        </v-select>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col md="6">
                                        <v-menu v-model="menu" :close-on-content-click="false"
                                            transition="scale-transition" ref="menu" offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="date" label="Date de naissance" readonly
                                                    v-on="on" filled></v-text-field>
                                            </template>
                                            <v-date-picker ref="picker" v-model="date"
                                                :max="new Date().toISOString().substr(0, 10)" min="1996-01-01"
                                                @change="save"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-text-field v-model="adresse" label="Adresse physique" filled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col md="6">
                                        <v-text-field v-model="emailPerso" label="Email personnel" filled>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="12">
                                        <v-text-field v-model="matricule" label="Matricule" filled></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </v-col>
                        <v-col md="3">
                            <profile />
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2" editable>Informations Complementaires</v-stepper-step>
            <v-stepper-content step="2">
                <v-container fluid>
                    <v-row>
                        <v-col md="8">
                            <v-file-input label="Diplomes" required filled multiple hint="Selection plus ou moins deux" autofocus chips counter="2">
                            </v-file-input>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="sectionObtention" label="Section obtention diplome" required filled>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="4">
                            <v-text-field v-model="nomEntreprise" readonly label="Nom de L'entreprise" required filled>
                            </v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="adresseEntreprise" readonly label="Adresse de L'entreprise" required filled>
                            </v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="tauxHoraire" readonly label="Taux Horaires" required filled>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-textarea label="Presentation" filled>

                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                </v-container>
            </v-stepper-content>

            <v-stepper-step step="3" editable>Informations générées</v-stepper-step>
            <v-stepper-content step="3">
                <v-row>
                    <v-col md="4"><v-text-field readonly filled label="Email Esis" placeholder="example@esis.com"></v-text-field></v-col>
                    <v-col md="4"><v-text-field readonly filled label="Mot de passe" placeholder="0213654789"></v-text-field></v-col>
                    <v-col md="4"><v-text-field readonly filled label="Surnom"></v-text-field></v-col>
                </v-row>
                <v-btn color="primary" @click="e6 = 1">Finir</v-btn>

            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>
<script>
import profile from '@/components/global/profile.vue'
    export default {
        name: "inscription-prof",
        components:{
            profile
        },
        data() {
            return {
                e6: 1,
                again1: false,
                presentation:"",
                adresseEntreprise:"",
                nomEntreprise:"",
                tauxHoraire:0,
                matricule:"",
                again2: false,
                date: null,
                valid: false,
                menu: false,
                titre:"",
                titres: ["Professeur Ordinaire", "Assistant", "Chef de Travaux"],
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
                emailPerso: '',
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
            },
            addResponsable() {
                this.responsables.add();
            }
        },
    }
</script>

<style>
    img {
        border-radius: 50%;
    }
</style>