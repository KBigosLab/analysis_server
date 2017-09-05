
var sql = require('fusion/sql');

exports.add = function(model,name) {
  sql.query('INSERT INTO models(Model, Name) VALUES (:)',arguments);
}

exports.get = function(model) {
  return sql.get('SELECT * FROM models WHERE Model=?',arguments);
}

exports.getByName = function(model) {
  return sql.get('SELECT * FROM models WHERE Name=?',arguments);
}

