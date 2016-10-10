"use strict";
require('../models/User.js');
const mongoose = require('mongoose'),
    User = mongoose.model('User');

const passwordHash = require('password-hash');

const Index = {

	getLogin: function(req,res){
		res.render('users/connect');
	},
	//Connexion
	logIn: function(req,res){

		if(req.body.pseudo && req.body.mdp){
  		let mdphash = passwordHash.generate(req.body.mdp);
  		User.findOne({'pseudo': req.body.pseudo, 'mps': mdphash},'name', function(err,user){
  			if (err) throw (err);
        if(user){
          req.session.name = user.name;
          console.log('Connexion en cours')
          console.log(req.session);
          res.redirect('/users/');
        }else{
          res.send('Echec du find');
        }
        });

		} else{
			console.log('Champs manquant');
			res.redirect('/login');
		}

	},
  //Déconnexion
	logOut: function(req,res){
		req.session.destroy(function(err){
			if (err) throw err;
		});
	}

};
module.exports = Index;
