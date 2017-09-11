
var db = require('analysis/db');

exports.main = function() {
  db.worklist.clearAllJobs();

  for (var k=0;k<1000;k++) {
    db.worklist.addJob('gene'+k,1);
  }
}

