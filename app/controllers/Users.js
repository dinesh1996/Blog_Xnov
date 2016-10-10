"use strict";

var User = require('../models/User');
const crypto = require('crypto');

const Users = {
	//Fonction réservée pour l'admin
	index: function (req, res) {

		User.find({}, function (err, users) {
			if (err) throw err;
			res.render('users/index', {title: "users", users: users});
		});


	},

	create: function (req, res) {

    /*console.log(req.body.name);
    console.log(req.body.firstName);
    console.log(req.body.email);
    console.log(req.body.pseudo);
    console.log(req.body.adress);
    console.log(req.body.mps);
    console.log(req.body.confMps);
    console.log(req.body.firstName);*/
    //Faire une vérif de l'existence de l'utilisateur
		if(req.body.name && req.body.firstName && req.body.email && req.body.pseudo && req.body.adress && req.body.mps && req.body.confMps){

			//On regarde si il y a un utilisateur déjà existant avec
			User.findOne({name: req.body.name, firstName:req.body.firstName, email: req.body.email, pseudo:req.body.pseudo, address:req.body.adress},function(err, user){
				if (err) throw (err);
				if(user){
					res.redirect('/login');
				}

			});
      if(req.body.mps == req.body.confMps){

        var user = new User({
  				name: req.body.name,
  				firstName: req.body.firstName,
  				email: req.body.email,
  				pseudo: req.body.pseudo,
  				address: req.body.adress,
  				mdp: crypto.createHash('sha1').update(req.body.mps).digest('hex'),
  				createdOn: new Date(),
  				status: true,
  				activated: true
        });

  			console.log(user);
  			user.save(function (err) {
  				if (err) throw err;
  				console.log('User inserted');
  				res.redirect('/login');
  			});

      }

		} else{
			console.log('Champs manquant ou les mdp insérés ne sont pas les mêmes.');
			res.redirect('/users/create');
		}

	},

	preupdate: function(req,res){
		User.findById(req.params.id, function (err, user) {
			res.render('users/UpdateUser', {title: "user", user: user});
			if (err) throw err;
		});
	},


	update: function (req, res) {

		User.findById(req.params.id, function (err, user) {

			if (err) throw err;
			console.log(user);

			if(req.body.name){
			user.name = req.body.name;
			}

			if(req.body.firstName){
			user.firstName =  req.body.firstName;
			}

			if(req.body.email){
			user.email =  req.body.email;
			}

			if(req.body.pseudo){
			user.pseudo =req.body.pseudo;
			}

			if(req.body.adress){
			user.adress =  req.body.adress;
			}

			if(req.body.mps && req.body.confMps){
				if(req.body.mps == req.body.confMps){
					user.mps = crypto.createHash('sha1').update(req.body.mps).digest('hex');
				}
			}

			user.changeOn =  new Date();
			//req.body.map(v => req.session.flash('', v));
			// save the user
			user.save(function (err) {
				if (err) throw err;
				console.log('User successfully updated!');
				res.redirect("/users/");
			});

		});
	},

	predelete: function(req,res) {

		User.findById(req.params.id, function (err, user) {
			res.render('users/DeleteUser', {title: "user", user: user});
			if (err) throw err;
		});
	},

	delete: function (req, res) {

		User.findById(req.params.id, function (err, user) {
			if (err) throw err;

			// delete him
			user.activated= false;
			user.save(function (err) {
				if (err) {
					throw err;
				}
				console.log('User successfully deleted!');
				console.log(user);
				res.redirect('/users/');
			});

		});

	}
};

module.exports = Users;
