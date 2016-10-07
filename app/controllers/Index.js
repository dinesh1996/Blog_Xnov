"use strict";

const mongoose = require('mongoose'),
    User = mongoose.model('User');

const passwordHash = require('password-hash');

const Index = {
	
	getLogin: function(req,res){
		res.render('login');
	},
	//Connexion
	logIn: function(req,res){
		if(req.body.pseudo && req.body.mdp){

		let mdphash = passwordHash.generate(req.body.mdp); 
		User.findOne({'pseudo': req.body.pseudo, 'mps': mdphash}, function(err,person){
			if (err) throw (err);
			req.session = person;
		});
		}else{
			console.log('Champs manquant');
			res.redirect('/');
		}

	},
	logOut: function(req,res){
		req.session.destroy(function(err){
			if (err) throw err;
		});
	}
};

