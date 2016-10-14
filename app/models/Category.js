/**
 * Created by mac on 05/10/2016.
 */
"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const Article = require('mongoose').model('Article').schema;



const schema = new Schema({
    title: {type: String, required: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    activated: {type: Boolean},
    article: [{type: Schema.ObjectId, ref: 'Article'}] // assuming you name your model Task
});

module.exports = mongoose.model('Category', schema, 'categories');



