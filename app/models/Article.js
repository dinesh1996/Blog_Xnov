"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    title: {type: String, required: true},
    contents: {type: String, required: true},
    activated: {type: String, default: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    createdBy: {type: String},
    category: {type: Schema.ObjectId, ref: 'Category',required: true}, // assuming you name your model Task
    comments: [{type: Schema.ObjectId, ref: 'Comment'}] // assuming you name your model Task

});

module.exports = mongoose.model('Article', schema, 'articles');
