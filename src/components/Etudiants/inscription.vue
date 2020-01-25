<template>
    <v-container>
        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" editable>Informations de base</v-stepper-step>
            <v-stepper-content step="1">
                <v-container fluid>
                    <v-row>
                        <v-col md="8">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="Nom"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="lastname" :rules="nameRules" :counter="10" label="Post-nom"
                                        required> </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="nickname" :rules="nameRules" label="Prenom" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field v-model="telephone" :rules="telRules" label="Numero de telephone"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="4">
                                    <header>Genre</header>
                                    <v-radio-group v-model="radios" :mandatory="false" row>
                                        <v-radio label="F" value="F"></v-radio>
                                        <v-radio label="M" value="M"></v-radio>
                                    </v-radio-group>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col md="6">
                                    <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition"
                                        ref="menu" offset-y>
                                        <template v-slot:activator="{ on }">
                                            <v-text-field v-model="date" label="Date de naissance" readonly v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker ref="picker" v-model="date"
                                            :max="new Date().toISOString().substr(0, 10)" min="1996-01-01"
                                            @change="save">
                                        </v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="6">
                                    <v-text-field v-model="adresse" label="Adresse physique"></v-text-field>
                                </v-col>
                                <v-col md="6">
                                    <v-text-field v-model="emailPerso" label="Email personnel">
                                    </v-text-field>
                                </v-col>

                            </v-row>
                            <v-row>
                                <v-col md="12">
                                    <v-textarea v-model="noteSante" label="Note de sante personnel" solo
                                        name="input-7-4"> </v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col md="4">
                            <v-container>
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-col cols="6"><img src="@/assets/logo.png" alt="Avatar"
                                            style="width:150px;height:150px">
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2" editable>Informations complementaires</v-stepper-step>
            <v-stepper-content step="2">
                <v-container fluid>
                    <v-row>
                        <v-col md="3">
                            <v-text-field v-model="ecoleOrigine" readonly label="Nom ecole origine" required>
                            </v-text-field>
                        </v-col>
                        <v-col md="3">
                            <v-text-field v-model="adresseEcole" label="Adresse ecole" required>
                            </v-text-field>
                        </v-col>
                        <v-col md="3">
                            <v-text-field v-model="sectionObtention" label="Section obtention diplome" required>
                            </v-text-field>
                        </v-col>
                        <v-col md="2">
                            <v-text-field v-model="pourcentageExetat" label="Pourcentage exetat" required>
                            </v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col md="2">
                            <v-text-field v-model="anneeInscription" label="Annee Inscription" disabled required>
                            </v-text-field>
                        </v-col>
                        <v-col md="2">
                            <v-text-field v-model="pourcentageObtenuTest" label="% test admission" required>
                            </v-text-field>
                        </v-col>
                        <v-col md="2">
                            <v-select :items="niveau" label="Niveau academique"></v-select>
                        </v-col>
                        <v-col md="2">
                            <v-select :items="statuts" label="Statut academique" required></v-select>
                        </v-col>
                        <v-col md="2">
                            <v-text-field v-model="dateDiplomeEsis" readonly label="Date Diplome Esis"
                                hint="a definir prochainement" required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                </v-container>

            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3" editable>Informations du Responsables</v-stepper-step>
            <v-stepper-content step="3">
                <v-row>
                    <v-col md="3">
                        <v-text-field v-model="responsableNom" label="Nom responsable"></v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-text-field v-model="responsableNumero" label="Telephone responsable">
                        </v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-text-field v-model="responsableEmail" label="Email responsable">
                        </v-text-field>
                    </v-col>
                    <v-col md="3">
                        <v-btn @click="addResponsable" rounded color="teal">Ajouter</v-btn>
                    </v-col>
                </v-row>
                <v-btn color="primary" @click="e6 = 4">Continue</v-btn>

            </v-stepper-content>

            <v-stepper-step step="4" editable>View setup instructions</v-stepper-step>
            <v-stepper-content step="4">
                <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
                <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper>
    </v-container>
</template>
<script>
    export default {
        name: "inscription",
        data() {
           return {
                e6: 1,
                responsables: [{}],
                responsableNom: "",
                responsableNumero: "",
                responsableEmail: "",
                niveau:["PREPA","G1","G2","G3"],
                again1: false,
                pourcentageObtenuTest: 0,
                again2: false,
                statuts:["Candidat","Etudiant","Diplomé","Abandon","Renvoi"],
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