var Project = require('../models/project.js');

var list = function(error, success){
  var query = Project.find().select('name projectKind');
  return query.exec(function(err,coll){
    if (err) return error(err);
    success(coll);
  });
}

module.exports = list;
