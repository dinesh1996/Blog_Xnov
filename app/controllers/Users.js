"use strict";

require('../models/User');

var  mongoose = require('mongoose'),
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

        var user = new User({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            pseudo: req.body.pseudo,
            adress: req.body.adress,
            mps: req.body.mps,
            createdOn: new Date(),
            status: "users",
            active: false

        });
        console.log(user);
        user.save(function (err) {
            if (err) {

                throw err;

            }
            console.log('User inserted');
            alert('User inserted');
            res.redirect('/users/');

        });

    },

    preuppdate: function(req,res){

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
            user.adress =  req.body.adress;


//req.body.map(v => req.session.flash('', v));
            // save the user
            user.save(function (err) {
                if (err) throw err;

                console.log('User successfully updated!');
                alert('User successfully updated!');
                res.redirect("/users/");
            });

        });

    },
    delete: function (req, res) {

        User.findById(req.params.id, function (err, user) {
            if (err) throw err;

            // delete him
            user.remove(function (err) {
                if (err) throw err;

                console.log('User successfully deleted!');
                alert('User successfully deleted!');
            });
        });

        res.redirect('/users/');
    }
};

module.exports = Users;