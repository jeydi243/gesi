<template>
    <v-container>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Avertissement</v-card-title>
                <v-card-text>
                    Vous ne pouvez ajouter que deux responsables !
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                        Okay !
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <h1>Inscription</h1>
        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" editable>Informations de Base</v-stepper-step>
            <v-stepper-content step="1">
                <v-container fluid>
                    <v-row>
                        <v-col md="8">
                            <v-container>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="etudiant.name.first" :rules="rules.name" :counter="10" label="Nom"
                                            required filled></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="etudiant.name.last" :rules="rules.name" :counter="10"
                                            label="Post-nom" required filled></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field v-model="etudiant.name.nick" :rules="rules.name" label="Prenom" required
                                            filled></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field v-model="etudiant.telephone" :rules="rules.telephone" label="Numero de telephone"
                                            required filled></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-select v-model="etudiant.genre" label="Genre" :items="etudiant.genres" required filled>
                                        </v-select>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col md="6">
                                        <v-menu v-model="menu" :close-on-content-click="false"
                                            transition="scale-transition" ref="menu" offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="etudiant.dateNaissance" label="Date de naissance" readonly
                                                    v-on="on" filled :rules="rules.date"></v-text-field>
                                            </template>
                                            <v-date-picker locale="fr-FR" ref="picker" v-model="etudiant.dateNaissance"
                                                :max="new Date().toISOString().substr(0, 10)" :min="new Date('01/01/2000').toISOString().substr(0, 10)"
                                                @change="save"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-text-field v-model="etudiant.adresse" label="Adresse physique" filled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col md="6">
                                        <v-text-field v-model="etudiant.emailPerso" label="Email personnel" filled>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="12">
                                        <v-textarea counter="500" v-model="etudiant.noteSante" label="Note de sante" name="input-7-4" filled>
                                        </v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>

                        </v-col>
                        <v-col md="4">
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
                        <v-col md="4">
                            <v-text-field v-model="etudiant.ecoleOrigine" readonly label="Nom ecole origine" required filled>
                            </v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="etudiant.adresseEcole" label="Adresse ecole" required filled></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="etudiant.sectionObtention" label="Section obtention diplome" required filled>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="4">
                            <v-text-field v-model="etudiant.anneeInscriptionEsis" label="Annee Inscription" disabled required
                                filled>
                            </v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-select :items="etudiant.statuts" label="Statut academique" required filled></v-select>
                        </v-col>
                        <v-col md="4">
                            <v-select :items="etudiant.niveau" label="Niveau academique" required filled></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="4">
                            <v-text-field v-model="etudiant.pourcentageObtenuTestAdmission" label="% test admission" required
                                :rules="rules.pourcentage" filled></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="etudiant.dateDiplomeEsis" readonly label="Date Diplome Esis"
                                hint="a definir prochainement" disabled filled></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="etudiant.pourcentageExetat" label="Pourcentage exetat" required filled
                                :rules="rules.pourcentage"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                </v-container>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3" editable>Informations du Responsables</v-stepper-step>
            <v-stepper-content step="3">
                <v-row>
                    <v-col md="3">
                        <v-text-field v-model="etudiant.responsable.nom" label="Nom responsable" filled></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-text-field v-model="etudiant.responsable.telephone" label="Telephone responsable" filled></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-text-field v-model="etudiant.responsable.email" label="Email responsable" filled></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-btn @click="addResponsable" rounded color="teal" text>Ajouter</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col md="9">
                        <v-simple-table dark>
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">Nom</th>
                                        <th class="text-left">Telephone</th>
                                        <th class="text-left">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in responsables" :key="item.tel">
                                        <td>{{ item.nom }}</td>
                                        <td>{{ item.telephone }}</td>
                                        <td>{{ item.email }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-btn color="primary" @click="submitEtudiant">Finir l'inscription</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4" editable>Informations génerées</v-stepper-step>
            <v-stepper-content step="4">
                <v-row>
                    <v-col md="4">
                        <v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="etudiant.emailEsis"
                            label="Email Esis"></v-text-field>
                    </v-col>
                    <v-col md="4">
                        <v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="etudiant.passWord"
                            label="Mot de Passe email"></v-text-field>
                    </v-col>
                    <v-col md="4">
                        <v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="etudiant.emailEsis"
                            label="Email Esis"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col md="4">
                        <v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="etudiant.codeAcces"
                            label="Code d'acces"></v-text-field>
                    </v-col>
                    <v-col md="4">
                        <v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="etudiant.emailEsis"
                            label="Email Esis"></v-text-field>
                    </v-col>
                    <v-col md="4">
                        <v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="etudiant.emailEsis"
                            label="Email Esis"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>
<script>
    const cryptoRandomString = require('crypto-random-string');
    import profile from "@/components/global/profile.vue";
    import validator from 'validator'
    export default {
        name: "inscription",
        components: {
            profile
        },
        computed:{
            minDateNaissance(){
                return "01/01/2000"
            }
        },
        
        data() {
            return {
                etudiant: {
                    emailEsis: "ekadiongo@yahoo.fr",
                    emailPerso: "",
                    codeAcces: "",
                    passWord: "",
                    pourcentageExetat: 0,
                    pourcentageObtenuTestAdmission: 0,
                    sectionObtention: "",
                    adresseEcole: "",
                    adressePersonel: "",
                    ecoleOrigine: "",
                    genre: "F",
                    noteSante: "",
                    dateDiplomeEsis: new Date().toISOString().substr(0, 10),
                    dateNaissance: new Date().toISOString().substr(0, 10),
                    anneeInscriptionEsis: new Date().getFullYear().toString(),
                    telephone: "",
                    genres: ["M", "F"],
                    niveau: ["PREPA", "G1", "G2", "G3"],
                    statuts: ["Candidat", "Etudiant", "Diplomé", "Abandon", "Renvoi"],
                    name: {
                        first: "",
                        last: "",
                        nick: "",
                    },
                    responsable: {
                        nom: "",
                        telephone: "",
                        email: "",
                    },

                },
                rules: {
                    name: [
                        v => !!v || "Ce champ est obligatoire",
                        v => v.length <= 10 || "10 caracteres au plus sont permis"
                    ],
                    pourcentages: [
                        v => !!v || "Ce champ  est obligatoire",
                        v => parseInt(v) >= 55 ||"Le pourcentage doit etre superieur a 55"
                    ],
                    email: [
                        v => !!v || "l'email est obligatoire",
                        v => validator.isEmail(v) || "l'Email doit etre valide"
                    ],
                    telephone: [v => !!v || "Ce champ est obligatoire"],
                    date: [v => validator.isDate(v,'DD/MM/YYYY') || "La date de naissance doit etre valide"]
                },
                e6: 1,
                dialog: false,
                responsables: [],
                again1: false,
                again2: false,
                valid: false,
                menu: false,
                tel: "",
                email: "",
            };
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
            }
            
        },
        methods: {
            save(date) {
                this.$refs.menu.save(date);
            },
            addResponsable() {
                if (this.responsables.length < 2) {
                    this.responsables.push({
                        nom: this.responsableNom,
                        tel: this.responsableTel,
                        email: this.responsableEmail
                    });
                    this.responsableNom = "";
                    this.responsableTel = "";
                    this.responsableEmail = "";
                } else {
                    this.dialog = true;
                }
            },
            submitEtudiant() {
                this.passWord = cryptoRandomString({
                    length: 10,
                    type: 'numeric'
                });
                this.e6 = 4;
            }
        }
    };
</script>

<style>
    img {
        border-radius: 50%;
    }

    #btnDownload {
        margin: -25px;
    }
</style>