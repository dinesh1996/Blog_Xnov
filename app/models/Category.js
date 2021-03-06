/**
 * Created by mac on 05/10/2016.
 */
"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;






const schema = new Schema({
    title: {type: String, required: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    activated: {type: Boolean},
    articles: [{type: Schema.ObjectId, ref: 'Article'}] // assuming you name your model Task
});

module.exports = mongoose.model('Category', schema, 'categories');



