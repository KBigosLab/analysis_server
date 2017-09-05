
var db = require('analysis/db');

exports.expects = {
  ip: {type: 'string', required: true},
}

exports.requires = function($P) {
}

exports.main = function($P) {

  var owner = 1;
  var job = db.worklist.checkout(owner);
  var model = db.models.get(job.model);

  $P.json({
    model: model,
    job: job,
    regressors: [ [] ],
  });
}

