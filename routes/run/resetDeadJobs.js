
var db = require('analysis/db');

exports.main = function() {
  db.worklist.resetDeadJobs();
}

