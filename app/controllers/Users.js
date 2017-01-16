"use strict";

const User = require('../models/User');
const crypto = require('crypto');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Article = require('../models/Article');
let sess;

const Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
     index: function (req, res) {
       console.log(sess);
       if(sess == null ||sess ==  "undefined"){
         res.redirect('/users/login');
       }
        if(sess.status == true){
	         User.find({}, function (err, users) {
             if (err) throw err;
             res.render('users/index', {title: "users", users: users});
         });
	      }
      	if(sess.status == false){
      		res.redirect('/articles/');
      	}

     },
     getSignUp: function (req, res) {
       if(sess == null){
         res.render('users/NewUserCreate');
       }
       if(sess != null){
         res.redirect('/users/profil');
       }

     },
     //Crée un utilisateur
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
         if (req.body.name && req.body.firstName && req.body.email && req.body.pseudo && req.body.adress && req.body.mps && req.body.confMps) {

             //On regarde si il y a un utilisateur déjà existant avec
             User.findOne({
                 name: req.body.name,
                 firstName: req.body.firstName,
                 email: req.body.email,
                 pseudo: req.body.pseudo,
                 address: req.body.adress
             }, function (err, user) {
                 if (err) throw (err);
                 if (user) {
                     res.redirect('/users/login');
                 }
                 if (req.body.mps == req.body.confMps) {

                     var user = new User({
                         name: req.body.name,
                         firstName: req.body.firstName,
                         email: req.body.email,
                         pseudo: req.body.pseudo,
                         address: req.body.adress,
                         mdp: crypto.createHash('sha1').update(req.body.mps).digest('hex'),
                         createdOn: new Date(),
                         status: false,
                         activated: true
                     });

                     console.log(user);
                     user.save(function (err) {
                         if (err) throw err;
                     });
                         console.log('User inserted');
                         res.redirect('/users/login');

                 }


             });
         } else {
             console.log('Champs manquant ou les mdp insérés ne sont pas les mêmes.');
             res.redirect('/users/create');
         }
     },

 getLogin: function (req, res) {
             res.render('users/connect');
         },
         //Connexion
 logIn: function (req, res) {
             if (req.body.pseudo && req.body.mdp) {

                 let mdphash = crypto.createHash('sha1').update(req.body.mdp).digest('hex');
                 User.findOne({
                     pseudo: req.body.pseudo,
                     mdp: mdphash
                 }, 'name id firstName email pseudo status address ', function (err, user) {
                     if (err) throw (err);
                     if (user) {
                         sess = req.session;
                         sess.name = user.name;
                         sess.firstName = user.firstName;
                         sess.email = user.email;
                         sess.pseudo = user.pseudo;
                         sess.address = user.address;
                         sess.userID = user.id;
                         sess.status = user.status;
                         sess.save(function (err) {
                             if (err) throw (err);
                             res.redirect('/users/profil');
                             console.log(req.session);
                             console.log('Connexion en cours');
                             console.log("Connexion réussie");
                         });
                     } else {
                         res.send('Echec de la connexion');
                         res.redirect('/users/login');
                     }
                 });
             } else {
                 res.send('Champs manquants');
                 res.redirect('/users/login');
             }
       },
       //Déconnexion
     logOut: function (req, res) {
         sess = null;
         req.session.destroy(function (err) {
             if (err) throw err;
             res.redirect('/users/login');
         });
     },
     getProfil: function (req, res) {
         /*req.session.regenerate(function(err){
          if (err) throw (err);
          console.log("session regenerated");

          req.session.reload(function(err){

          console.log(req.session.name);
          if (err) throw (err);
          console.log("Session loaded");
          });

          });*/
         //	sess = req.session.reload(function(err){
         //	  if (err) throw (err);

         if (sess != null) {
             res.render('users/profil', {
                 title: "Profil",
                 nom: sess.name,
                 prenom: sess.firstName,
                 adresse: sess.address,
                 email: sess.email,
                 pseudo: sess.pseudo
             });
             console.log(sess.status);
         } else {
             res.redirect('/users/login');
             console.log("Il n'y a rien.");
         }
         //	  });
     },
     preupdate: function(req,res){
 		sess = req.session.regenerate(function(err){if(err)throw(err);});
     		if(sess != null){
         		res.render('users/UpdateUser', {title: "user", user: sess});
     		} else{
       		res.redirect('/users/login');
     		}

 	},

     update: function (req, res) {
     		if(sess == null){
 			res.redirect("/users/login");
 		}else{
 		User.findById(sess.userID, function (err, user) {

 			if (err) throw err;
 			console.log(user);

 			if(req.body.name){
 				user.name = req.body.name;
 				sess.name = user.name;
 			}

 			if(req.body.firstName){
        Article.find({createdBy:user.firstName},function(err,articles){
          for(index = 0;index<articles.length;index++){
            articles.createdBy = req.body.firstName;

          }
          articles.save(function(err){if(err)throw err;});
        });
 				user.firstName =  req.body.firstName;
 				sess.firstName = user.firstName;
 			}

 			if(req.body.email){
 				user.email =  req.body.email;
 				sess.email = user.email
 			}
 			if(req.body.adress){
 				user.address =  req.body.adress;
 				sess.address = user.address;
 			}

 			if(req.body.mps && req.body.confMps){
 				if(req.body.mps == req.body.confMps){
 					user.mdp = crypto.createHash('sha1').update(req.body.mps).digest('hex');
 				}
 			}

 			user.changeOn =  new Date();
 			//req.body.map(v => req.session.flash('', v));
 			// save the user
 			user.save(function (err) {
 				if (err) throw err;
 				console.log('User successfully updated!');
 				res.redirect("/users/profil");
        sess.save(function (err) {
   				if (err) throw err;
        });
 			});

 		});
 		}
 	},


   //Affiche la page de désactivation d'utilisateur
       predelete: function (req, res) {

           User.findById(req.params.id, function (err, user) {
               res.render('users/DeleteUser', {title: "user", user: user});
               if (err) throw err;
           });
       },

       //Rends inactif le compte d'un utilisateur
       delete: function (req, res) {

           User.findById(req.params.id, function (err, user) {
               if (err) throw err;

               // delete him
               user.activated = false;
               user.save(function (err) {
                   if (err) {
                       throw err;
                   }
                   console.log('User successfully deleted!');
                   console.log(user);
                   res.redirect('/users/');
               });

           });

         },
	promoteUserAdmin:function(req,res){
  		if(sess.status == true){
  			User.findById(req.params.id,function(err,user){
  				if (err) throw err;
  				user.status = true;
  				user.save(function(err){
  				if(err) throw err;
  				res.redirect('/users/');
  				});
  			});
  		}if(sess.status == false ){
  			res.redirect('/articles/');
  		} if(sess.name == null || sess.name == 'undefined'){
  			res.redirect('/users/login');
  		}
	},
	demoteAdmin:function(req,res){
    		if(sess.status == true){
    			User.findById(req.params.id,function(err,user){
    				if (err) throw err;
    				user.status = false;
            console.log(user.firstName +"est devenu" + user.status);
    				user.save(function(err){
    				if(err) throw err;
            console.log(user.firstName +"est devenu" + user.status);
    				res.redirect('/users/');
    				});
    			});
    		}
        if(sess.status == false ){
    			res.redirect('/articles/');
    		} if(sess.name == null || sess.name == 'undefined'){
    			res.redirect('/users/login');
    	}
  },


};
module.exports.getSession = function(sess){
  return sess;
};
module.exports = Users;
