
var sql = require('fusion/sql');

exports.registerWorker = function(ip,id) {
  var worker = sql.get('SELECT * FROM workers WHERE IP=?',arguments);
  if (!worker) {
    var res = sql.query('INSERT INTO workers(IP,ID) VALUES (:)',arguments);
    return res.insertId;
  } else return worker.workerID;
}

exports.checkin = function(workerID) {
  sql.query('UPDATE workers SET LastCheckin=NOW() WHERE WorkerID=?',arguments);
}

