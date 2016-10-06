
"use strict";
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;



const schema = new Schema({
    name: {type: String, required: true},
    createdOn: {type: Date},
    changeOn: {type: Date},
    article: [Article]
});

exports.model = mongoose.model('Category', schema, 'categories');