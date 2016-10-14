/**
 * Created by mac on 05/10/2016.
 */
"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const Comment = require('./Comment');


const schema = new Schema({
    title: {type: String, required: true},
    contents: {type: String, required: true},
    activated: {type: String, default: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    createdBy: {type: String},
    category: [{type: Schema.ObjectId, ref: 'Category'}], // assuming you name your model Task
    comments: [Comment]

});

module.exports = mongoose.model('Article', schema, 'articles');
