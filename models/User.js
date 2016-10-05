var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var schema = new Schema({
    pseudo: {type: String, required: true},
    name: {type: String, required: true},
    firstName: {type: String, required: true},
    address: {type: String},
    email: {type: String, required: true},
    activated: {type: String, default: true},
    status: {type: String, default: 'User'},
    createdOn: {type: Date, default: Date.now},
    changeOn: {type: Date}
});

// Nous exportons notre modèle avec comme nom "User", 'users' sera le nom de notre "table"
exports.model = mongoose.model('User', schema, 'users');