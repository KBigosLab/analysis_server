
var db = require('analysis/db');

exports.main = function() {
  var model = 1;
  db.worklist.resetDeadJobs(model);
}

