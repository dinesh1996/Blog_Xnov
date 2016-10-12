/**
 * Created by mac on 05/10/2016.
 */
"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Articles = require('./Article');



const schema = new Schema({
    title: {type: String, required: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    activated: {type: Boolean},
    article: { type: mongoose.Schema.Types.ObjectId, ref:'Articles'}
});

module.exports = mongoose.model('Category', schema, 'categories');



