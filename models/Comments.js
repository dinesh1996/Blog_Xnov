"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    content: {type: String, required: true},
    createdOn: {type: Date},
    article: {type: Article}
});

exports.model = mongoose.model('Comment', schema, commments);