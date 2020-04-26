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
                                        <v-text-field v-model="telephone" :rules="telRules" label="Numero de telephone"
                                            required filled></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-select v-model="genre" label="Genre" :items="genres" required filled>
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
                                        <v-textarea v-model="noteSante" label="Note de sante personnel" solo
                                            name="input-7-4"></v-textarea>
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
                            <v-text-field v-model="ecoleOrigine" readonly label="Nom ecole origine" required filled>
                            </v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="adresseEcole" label="Adresse ecole" required filled></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="sectionObtention" label="Section obtention diplome" required filled>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="4">
                            <v-text-field v-model="anneeInscription" label="Annee Inscription" disabled required filled>
                            </v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-select :items="statuts" label="Statut academique" required filled></v-select>
                        </v-col>
                        <v-col md="4">
                            <v-select :items="niveau" label="Niveau academique" required filled></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col md="4">
                            <v-text-field v-model="pourcentageObtenuTest" label="% test admission" required
                                :rules="prcRules" filled></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="dateDiplomeEsis" readonly label="Date Diplome Esis"
                                hint="a definir prochainement" disabled filled></v-text-field>
                        </v-col>
                        <v-col md="4">
                            <v-text-field v-model="pourcentageExetat" label="Pourcentage exetat" required filled
                                :rules="prcRules"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                </v-container>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3" editable>Informations du Responsables</v-stepper-step>
            <v-stepper-content step="3">
                <v-row>
                    <v-col md="3">
                        <v-text-field v-model="responsableNom" label="Nom responsable" filled></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-text-field v-model="responsableTel" label="Telephone responsable" filled></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-text-field v-model="responsableEmail" label="Email responsable" filled></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-btn @click="addResponsable" rounded color="teal" text>Ajouter</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col md="9">
                        <v-simple-table>
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
                                        <td>{{ item.tel }}</td>
                                        <td>{{ item.email }}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                </v-row>
                <v-btn color="primary" @click="FinirInscription">Finir l'inscription</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4" editable>Informations génerées</v-stepper-step>
            <v-stepper-content step="4">
                <v-row>
                    <v-col md="4"><v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="emailEsis" label="Email Esis"></v-text-field></v-col>
                    <v-col md="4"><v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="passWord" label="Mot de Passe email"></v-text-field></v-col>
                    <v-col md="4"><v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="emailEsis" label="Email Esis"></v-text-field></v-col>
                </v-row>
                <v-row>
                    <v-col md="4"><v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="CodeAcces" label="Code d'acces"></v-text-field></v-col>
                    <v-col md="4"><v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="emailEsis" label="Email Esis"></v-text-field></v-col>
                    <v-col md="4"><v-text-field dense background-color="rgba(0,240,0,0.2)" disabled filled v-model="emailEsis" label="Email Esis"></v-text-field></v-col>
                </v-row>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>
<script>
    const cryptoRandomString = require('crypto-random-string');

    import profile from "@/components/Etudiants/profile.vue";
    export default {
        name: "inscription",
        components: {
            profile
        },
        data() {
            return {
                emailEsis:"ekadiongo@yahoo.fr",
                CodeAcces:"",
                der:true,
                passWord:"",
                e6: 1,
                dialog: false,
                pourcentageExetat: 0,
                sectionObtention: "",
                adresseEcole: "",
                ecoleOrigine: "",
                genre: "F",
                noteSante: "",
                telephone: "",
                emailPerso: "",
                dateDiplomeEsis: Date,
                responsables: [],
                responsableNom: "",
                responsableTel: "",
                responsableEmail: "",
                niveau: ["PREPA", "G1", "G2", "G3"],
                again1: false,
                again2: false,
                pourcentageObtenuTest: 0,
                statuts: ["Candidat", "Etudiant", "Diplomé", "Abandon", "Renvoi"],
                date: null,
                valid: false,
                menu: false,
                genres: ["M", "F"],
                adresse: "",
                anneeInscription: new Date().getFullYear().toString(),
                tel: "",
                firstname: "",
                nickname: "",
                lastname: "",
                telRules: [v => !!v || "Ce champ est obligatoire"],
                email: "",
                nameRules: [
                    v => !!v || "Ce champ  est obligatoire",
                    v => v.length <= 10 || "10 caracteres au plus sont permis"
                ],
                prcRules: [
                    v => !!v || "Ce champ  est obligatoire",
                    v =>
                    parseInt(v) >= 55 ||
                    "Le pourcentage doit etre superieur a 55"
                ],
                emailRules: [
                    v => !!v || "l'email est obligatoire",
                    v => /.+@.+/.test(v) || "l'Email doit etre valide"
                ]
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
            affiche() {
                console.log("la methode afficher a été appelé ");
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
            FinirInscription() {
                this.passWord = cryptoRandomString({length: 10, type: 'numeric'});
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