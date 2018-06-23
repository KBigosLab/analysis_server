
var sql = require('fusion/sql');
var moment = require('moment-timezone');
var cachedQueue = require('analysis/cachedQueue');

exports.addJob = function(name,model) {
  sql.query('INSERT INTO worklist(Name, Model, Summary) VALUES (:)',[name,model,'']);
}

exports.removeJob = function(name,model) {
  sql.query('DELETE FROM worklist WHERE Name=? AND Model=? LIMIT 1',arguments);
}

exports.checkout = function(workerID) {
  var self = this;
  var nullDate = '0000-00-00 00:00:00';

  var jobID = cachedQueue.getPendingJobID();
  var checkedOutOn = moment().format('YYYY-MM-DD HH:mm:ss');
  sql.query('UPDATE worklist SET Checkout=?,WorkerID=? WHERE JobID=? AND WorkerID=0 LIMIT 1',[checkedOutOn,workerID,jobID]);
  return sql.get('SELECT JobID,Name,Model FROM worklist WHERE JobID=?',[jobID]);
}

exports.checkin = function(workerID,jobID,summary) {
  sql.query('UPDATE worklist SET Checkin=NOW(),Summary=:2 WHERE WorkerID=:0 AND JobID=:1',[workerID,jobID,summary]);
/*  sql.fork(function(sql) {
    sql.query('LOCK TABLES worklist WRITE');
    sql.query('UPDATE worklist SET Checkin=NOW(),Summary=:2 WHERE WorkerID=:0 AND JobID=:1',[workerID,jobID,summary]);
    sql.query('UNLOCK TABLES');
  });*/
}

exports.getResults = function(model) {
  return sql.query('SELECT JobID,Name,Summary FROM worklist WHERE Model=? AND Summary!=?',[model,'']);
}

exports.getEntireWorklist = function(model) {
  return sql.query('SELECT JobID,Name,Summary FROM worklist WHERE Model=?',[model,'']);
}

exports.getRecentJobs = function() {
  return sql.query('SELECT JobID,WorkerID,Checkin FROM worklist WHERE Checkin>DATE_SUB(NOW(), INTERVAL 5 hour)',[]);
}

exports.resetDeadJob = function(jobID) {
  var nullDate = '0000-00-00 00:00:00';
  sql.query('UPDATE worklist SET WorkerID=0,Checkout=:0,Checkin=:0,Summary=:1 WHERE JobID=:2 LIMIT 1',[nullDate,'',jobID]);
}

exports.resetDeadJobs = function(model) {
  var nullDate = '0000-00-00 00:00:00';
  sql.fork(function(sql) {
    sql.query('LOCK TABLES worklist WRITE');
    sql.query('UPDATE worklist SET WorkerID=0,Checkout=:0,Checkin=:0 WHERE Summary=:1 AND DATE_ADD(Checkout,INTERVAL 2 hour) < NOW()',[nullDate,'']);
    sql.query('UNLOCK TABLES');
  });
}

