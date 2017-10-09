
var sql = require('fusion/sql');

exports.add = function(name,key) {
  sql.query('INSERT INTO models(Name,`Key`) VALUES (:)',arguments);
}

exports.get = function(model) {
  return sql.get('SELECT * FROM models WHERE Model=?',arguments);
}

exports.getByName = function(model) {
  return sql.get('SELECT * FROM models WHERE Name=?',arguments);
}

