
var sql = require('fusion/sql');

exports.getWorkers = function() {
  return sql.query('SELECT * FROM workers');
}

exports.registerWorker = function(ip,id) {
  id = id || '';
  var worker = sql.get('SELECT * FROM workers WHERE IP=? AND ID=?',arguments);
  if (!worker) {
    var res = sql.query('INSERT INTO workers(IP,ID) VALUES (:)',[ip,id]);
    return res.insertId;
  } else return worker.workerID;
}

exports.checkin = function(workerID) {
  sql.query('UPDATE workers SET LastCheckin=NOW() WHERE WorkerID=?',arguments);
}

