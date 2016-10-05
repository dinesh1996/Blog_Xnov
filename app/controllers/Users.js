"use strict"



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
            res.render('index', {title: "users", users: users});
        });


    },
    create: function (req, res) {

        let user = new User({
            name: req.body.name,
            firstName: req.body.firstname,
            email: req.body.email,
            pseudo: req.body.pseudo,
            adress: req.body.adress,
            mps: req.body.mps,
            createdOn: new Date.now(),
            status: "users",
            active: false


        });

        user.save(function (err) {
            if (!err) {
                console.log('User inserted');
            }
        });

        res.redirect('/users');
    },
    update: function (req, res) {
        // Mongoose pour l'update
    },
    delete: function (req, res) {

    }
};

module.exports = Users;