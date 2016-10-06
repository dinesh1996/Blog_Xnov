
/**
 * Created by mac on 05/10/2016.
 */
"use strict";

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


const schema = new Schema({
    content: {type: String, required: true},
    createdOn: {type: Date},
    article: {type: Article},
    user: {type: User}
});

exports.model = mongoose.model('Comment', schema, commments);