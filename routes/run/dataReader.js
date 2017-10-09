
var db = require('analysis/db');
var csv = require('fusion/csv');
var path = require('path');
var debugSource = require('analysis/sources/debug');
var origCatieSource = require('analysis/sources/origCatie');

exports.expects = {
  workerID: {type: 'integer', required: true},
}

exports.requires = function($P) {
}

exports.main = function() {

  var job = { jobID: 18, name: '1.19116294', model: 1 };
  if (job) {
    var model = db.models.get(job.model);

    var subjects = csv.csv2json(path.join(Const.modelsDir,model.name,model.name+'.csv'));
    var input = [];
    for (var k in subjects) {
      if (k == 0) continue;
      input.push(subjects[k][0]);
    }
    var regressor = origCatieSource.getGenotypeMap(job.name,input);
    console.log(regressor);
  }
}

