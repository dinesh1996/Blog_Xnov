var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    title: {type: String, required: true},
    contents: {type: String, required: true},
    activated: {type: String, default: true},
    category: {type: [String], require: true},
    createdOn: {type: Date, default: Date.now},
    changeOn: {type: Date}
});

exports.model = mongoose.model('Arcticle', schema, 'articles');