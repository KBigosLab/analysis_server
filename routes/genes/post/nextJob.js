
var db = require('analysis/db');
var csv = require('fusion/csv');
var path = require('path');
var debugSource = require('analysis/sources/debug');

exports.expects = {
  workerID: {type: 'integer', required: true},
}

exports.requires = function($P) {
}

exports.main = function($P) {

  var owner = $P.args.workerID;
  var job = db.worklist.checkout(owner);
  if (job) {
    var model = db.models.get(job.model);

    var subjects = csv.csv2json(path.join(Const.modelsDir,model.name,model.name+'.csv'));
    var input = [];
    for (var k in subjects) {
      if (k == 0) continue;
      input.push(subjects[k][0]);
    }
    var regressor = debugSource.getGenotypeMap(input);

    $P.json({
      model: model,
      job: job,
      regressor: regressor,
    });
  } else $P.json({});
}

