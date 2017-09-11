
var sql = require('fusion/sql');
var moment = require('moment-timezone');

exports.addJob = function(name,model) {
  sql.query('INSERT INTO worklist(Name, Model) VALUES (:)',arguments);
}

exports.checkout = function(workerID) {
  var self = this;
  var nullDate = '0000-00-00 00:00:00';

  var res = null;

  sql.fork(function(sql) {

    sql.query('LOCK TABLES worklist WRITE');
    try {
      sql.query('START TRANSACTION');
      var checkedOutOn = moment().format('YYYY-MM-DD HH:mm:ss');
      sql.query('UPDATE worklist SET Checkout=?,WorkerID=? WHERE Checkout=? AND WorkerID=0 AND Checkin=? LIMIT 1',[checkedOutOn,workerID,nullDate,nullDate]);
      res = sql.get('SELECT JobID,Name,Model FROM worklist WHERE Checkout=? AND WorkerID=? AND Checkin=?',[checkedOutOn,workerID,nullDate]);
      sql.query('COMMIT');
    } catch(e) {
      sql.query('ROLLBACK');
    }
    sql.query('UNLOCK TABLES');
  });

  return res;
}

exports.checkin = function(workerID,jobID) {
  sql.query('LOCK TABLES worklist WRITE');
  sql.query('UPDATE worklist SET Checkin=NOW() WHERE WorkerID=? AND JobID=?',arguments);
  sql.query('UNLOCK TABLES');
}

exports.clearAllJobs = function() {
  sql.query('DELETE FROM worklist');
}

