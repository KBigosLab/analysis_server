
var sql = require('fusion/sql');

exports.registerWorker = function(ip) {
  var worker = sql.get('SELECT * FROM workers WHERE IP=?',arguments);
  if (!worker) {
    var res = sql.query('INSERT INTO workers(IP) VALUES (:)',arguments);
    return res.insertId;
  } else return worker.workerID;
}

exports.checkin = function(workerID) {
  sql.query('UPDATE workers SET LastCheckin=NOW() WHERE WorkerID=?',arguments);
}

