// app/models/project.js

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
// define the schema for our user model
var projectSchema = Schema({
  name        : String,
  projectKind : String,
  companyId   : Schema.Types.ObjectId,
  team        : [Schema.Types.ObjectId]

});

// create the model and expose it to our app
module.exports = mongoose.model('Project', projectSchema);
