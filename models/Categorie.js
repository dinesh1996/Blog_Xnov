var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    name: {type: String, required: true},
    createdOn: {type: Date, default: Date.now},
    changeOn: {type: Date}
});

exports.model = mongoose.model('Categorie', schema, 'categories');