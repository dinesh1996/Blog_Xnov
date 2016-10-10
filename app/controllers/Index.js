"use strict";
const User = require('../models/User.js');

const crypto = require('crypto');

const Index = {

	getLogin: function(req,res){
		res.render('users/connect');
	},
	//Connexion
	logIn: function(req,res){

		if(req.body.pseudo && req.body.mdp){

			console.log(req.body.mdp);
      let mdphash = crypto.createHash('sha1').update(req.body.mdp).digest('hex');
      console.log(mdphash);
  		User.findOne({pseudo: req.body.pseudo,mdp: mdphash },'name firstName email pseudo address ', function(err,user){
      			if (err) throw (err);
              console.log(user);
            if(user){
                  req.session = user;
                  console.log('Connexion en cours');
                  res.redirect('/users/');
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
