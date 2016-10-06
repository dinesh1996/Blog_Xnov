
"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    pseudo: {type: String, required: true},
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    address: {type: String},
    email: {type: String, required: true},
    activated: {type: String, default: true},
    status: {type: String, default: 'User'},
    createdOn: {type:Date },
    changeOn: {type: Date}
});

exports.model = mongoose.model('User', schema, 'users');

