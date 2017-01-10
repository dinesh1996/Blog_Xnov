"use strict";



require('../models/User');

const  mongoose = require('mongoose'),
    User = mongoose.model('User');


const Users = {
    /**
     * @param req La requête entrante
     * @param res Ce qui est renvoyé au navigateur
     */
    index: function (req, res) {

        User.find({}, function (err, users) {
            if (err) throw err;
            res.render('users/index', {title: "users", users: users});
        });


    },
    create: function (req, res) {



        let user = new User({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            pseudo: req.body.pseudo,

            password: req.body.password,
            createOn: new Date(),
            status: true,
            activated: true



        });
        console.log(user);
        user.save(function (err) {
            if (err) {

                throw err;




            }
            console.log('User inserted');

            res.redirect('/users/');

        });


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

            // change the users location
            user.name = req.body.name;
            user.firstName =  req.body.firstName;
            user.email =  req.body.email;
            user.pseudo =req.body.pseudo;
            user.category = req.body.category._id;
            user.addres=  req.body.adress;
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