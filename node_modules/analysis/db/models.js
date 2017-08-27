
var sql = require('fusion/sql');

exports.add = function() {
  sql.query('INSERT INTO models(Model, Name) VALUES (:)',arguments);
}

