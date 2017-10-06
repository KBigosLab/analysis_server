
var db = require('analysis/db');
var csv = require('fusion/csv');
var path = require('path');
var origCatie = require('analysis/sources/origCatie');
var catie2 = require('analysis/sources/catie2');

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
    var index = {};
    for (var k in subjects) {
      if (k == 0) continue;
      index[subjects[k][0]] = true;
    }
    var input = [];
    for (var id in index) input.push(id);

    var regressor = catie2.getGenotypeMap(job.name,input);

    $P.json({
      model: model,
      job: job,
      regressor: regressor,
    });
  } else $P.json({});
}

