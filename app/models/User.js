"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    pseudo: {type: String, required: true},
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    address: {type: String},
    email: {type: String, required: true},
    mdp: {type: String, required: true},
    activated: {type: Boolean, default: true}, //1 = active ,,, 0 inactive
    status: {type: Boolean, default: true},// 1 = admin ,,,, 0 = user
    createdOn: {type:Date },
    password:{type: String },
    changeOn: {type: Date}
});

module.exports = mongoose.model('User', schema, 'users');
