
var sql = require('fusion/sql');

var queue = [];

var init = require('fusion/init')(function() {

  var nullDate = '0000-00-00 00:00:00';
  var jobs = sql.query('SELECT JobID FROM worklist WHERE Checkout=? AND WorkerID=0 AND Checkin=?',[nullDate,nullDate]);
  for (var k=jobs.length-1;k>=0;k--) {
    queue.push(+jobs[k].jobID);
  }
});

exports.getPendingJobID = function() {
  init();

  return queue.pop();
}
