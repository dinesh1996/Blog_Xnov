"use strict";
const User = require('../models/User.js');

const crypto = require('crypto');

let sess;

const Index = {

	getLogin: function(req,res){
		res.render('users/connect');
	},
	//Connexion
	logIn: function(req,res){

		if(req.body.pseudo && req.body.mdp){

      let mdphash = crypto.createHash('sha1').update(req.body.mdp).digest('hex');
  		User.findOne({pseudo: req.body.pseudo,mdp: mdphash },'name firstName email pseudo address ', function(err,user){
      			if (err) throw (err);
            if(user){
									sess = req.session;
									sess.name = user.name;
									sess.firstName = user.firstName;
									sess.email = user.email;
									sess.pseudo = user.pseudo;
									sess.address = user.address;
									sess.save();
									console.log('Connexion en cours');
                  res.redirect('/users/profil');
									console.log("Connexion réussie");
            } else{
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
