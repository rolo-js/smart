var mongoose = require('mongoose');
var configDB      = require('./config/database.js');

// Configuration for Passport
mongoose.connect(configDB.url); // connect to our database

var Project = require('./app/models/project.js');


var np = new Project({name:'EPT ARCO 2013',projectKind:'EPT'});
np.save(function(err){
  if (err) return function(){ console.log('error al salvar np')};
  console.log(' np salvado');
});


Project.create({name:'EPT ARQU 2012', projectKind:'EPT'},function(err,arq){
  if (err) return function(){ console.log('error en arq');};
  console.log(arq);
});
