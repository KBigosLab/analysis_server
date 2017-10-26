
var db = require('analysis/db');

exports.expects = {
  ip: {type: 'string', required: true},
  id: {type: 'string'},
}

exports.requires = function($P) {
  $P.require.auth();
}

exports.main = function($P) {
  console.log('Register worker request: '+$P.args.ip+'  '+$P.args.id);
  var workerID = db.workers.registerWorker($P.args.ip,$P.args.id);
  console.log('Registered worker '+workerID);
  $P.json({workerID: workerID});

}

