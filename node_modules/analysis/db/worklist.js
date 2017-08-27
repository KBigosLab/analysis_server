
var sql = require('fusion/sql');

exports.addJob = function(name,model) {
  sql.query('INSERT INTO worklist(Name, Model) VALUES (:)',arguments);
}

exports.checkoutJob = function() {

}

exports.clearAllJobs = function() {
  sql.query('DELETE FROM worklist');
}

