'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const model = require('./db');
mongoose.connect('mongodb://localhost:27017/gesi', {useCreateIndex: true});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// retrieves all the notes
app.get('/etudiant/list', (req, res) => {
	model.Etudiant.find({}).sort({
		updatedAt: 'descending'
	}).exec((err, listEtudiants) => {
		if (err) return res.status(404).send('Error while getting list etudiant!');
		return res.send({
			listEtudiants
		});
	});
});

// create a new note
app.post('/etudiant/add', (req, res) => {
	const etudiant = new Etudiant({
		matricule: req.body.matricule,
		nom: req.body.nom,
		postnom: req.body.postnom,
		prenom: req.body.prenom,
		genre: req.body.genre,
		dateNaissance: req.body.dateNaissance,
		photoProfil: req.body.photoProfil,
		telephone: req.body.telephone,
		adressePhysique: req.body.adressePhysique,
		email: req.body.email,
		noteMedicale: req.body.noteMedicale,
		anneeInscription: req.body.anneeInscription,
		responsable: req.body.responsable,
		diplomeEsis: req.body.diplomeEsis,
		statutEtudiant: req.body.statutEtudiant,
		niveauEtudiant: req.body.niveauEtudiant});

		etudiant.save((err) => {
		if (err) return res.status(404).send({
			message: err.message
		});
		return res.send({
			etudiant
		});
	});
});

// update an existing note with the given object id
app.post('/api/note/update/:id', (req, res) => {
	let options = {
		new: true
	};
	Note.findByIdAndUpdate(req.params.id, req.body.data, options, (err, note) => {
		if (err) return res.status(404).send({
			message: err.message
		});
		return res.send({
			message: 'note updated!',
			note
		});
	});
});

// delete an existing note with the given object id
app.post('/api/note/delete/:id', (req, res) => {
	Note.findByIdAndRemove(req.params.id, (err) => {
		if (err) return res.status(404).send({
			message: err.message
		});
		return res.send({
			message: 'note deleted!'
		});
	});
});

const PORT = 5000;
app.listen(PORT);
console.log('api runnging on port ' + PORT + ': ');