
var sql = require('fusion/sql');

exports.registerWorker = function(name) {
  var worker = sql.get('SELECT * FROM workers WHERE Name=?',arguments);
  if (!worker) {
    var res = sql.query('INSERT INTO workers(Name) VALUES ([value-1],[value-2],[value-3])');
    return res.insertId;
  } else return worker.workerID;
}

exports.checkin = function(name) {
  sql.query('UPDATE workers SET LastCheckin=NOW() WHERE Name=?',arguments);
}

