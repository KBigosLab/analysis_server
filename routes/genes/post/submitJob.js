
var db = require('analysis/db');

exports.expects = {
  workerID: {type: 'string', required: true},
  jobID: {type: 'string', required: true},
}

exports.requires = function($P) {
}

exports.main = function($P) {

  db.worklist.checkin($P.args.workerID,$P.args.jobID);
  db.results.post($P.args.jobID,$P.args.data);

  $P.json({});
}

