
var sql = require('fusion/sql');

exports.getWorkers = function() {
  return sql.query('SELECT * FROM workers');
}

exports.registerWorker = function(ip,id) {
  id = id || '';

  var res = null;

  sql.fork(function(sql) {

    sql.query('LOCK TABLES workers WRITE');

      var worker = sql.get('SELECT * FROM workers WHERE IP=? AND ID=?',[ip,id]);
      if (!worker) {
        console.log('About to register '+ip+'  '+id);
        try {
          sql.query('START TRANSACTION');
          var insert = sql.query('INSERT INTO workers(IP,ID) VALUES (:)',[ip,id]);
          res = insert.insertId
          sql.query('COMMIT');
        } catch(e) {
          sql.query('ROLLBACK');
        }
      } else res = worker.workerID;

    sql.query('UNLOCK TABLES');
  });

  return res;
}

exports.checkin = function(workerID) {
  sql.query('UPDATE workers SET LastCheckin=NOW() WHERE WorkerID=?',arguments);
}

