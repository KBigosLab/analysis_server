
var db = require('analysis/db');

exports.expects = {
  ip: {type: 'string', required: true},
}

exports.requires = function($P) {
  $P.require.auth();
}

exports.main = function($P) {

  var workerID = db.workers.registerWorker($P.args.ip);
  $P.json({workerID: workerID});

}

