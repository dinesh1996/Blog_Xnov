/**
 * Created by mac on 05/10/2016.
 */
"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Articles = require('./Articles');



const schema = new Schema({
    name: {type: String, required: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    article: [Articles]
});

module.exports = mongoose.model('Category', schema, 'categories');