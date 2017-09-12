
var db = require('analysis/db');

exports.expects = {
  workerID: {type: 'integer', required: true},
  jobID: {type: 'integer', required: true},
  summary: {type: 'object', required: true},
}

exports.requires = function($P) {
}

exports.main = function($P) {

  db.worklist.checkin($P.args.workerID,$P.args.jobID,JSON.stringify($P.args.summary));
  db.workers.checkin($P.args.jobID);

  $P.json({});
}

