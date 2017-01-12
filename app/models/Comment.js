
/**
 * Created by mac on 05/10/2016.
 */

"use strict";


const mongoose = require('mongoose'),
    Schema = mongoose.Schema;





const schema = new Schema({
    content: {type: String, required: true},
    createdOn: {type: Date},
    createdBy: {type: String},
    article: {type: Schema.ObjectId, ref: 'Article'} // assuming you name your model Task


});

module.exports = mongoose.model('Comment', schema, 'comments');










 



