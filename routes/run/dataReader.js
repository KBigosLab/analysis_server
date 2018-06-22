
var db = require('analysis/db');
var csv = require('fusion/csv');
var path = require('path');
var origCatieSource = require('analysis/sources/origCatie');
var catie2 = require('analysis/sources/catie2');

exports.expects = {
  workerID: {type: 'integer', required: true},
}

exports.requires = function($P) {
}

exports.main = function() {

//  var job = { jobID: 18, name: '1.19116294', model: 13 };
  var job = { jobID: 18, name: '1:219977846', model: 13 };

  if (job) {
    var model = db.models.get(job.model);

    var subjects = csv.csv2json(path.join(Const.modelsDir,model.name,model.name+'.csv'));
    var input = [];
    for (var k in subjects) {
      if (k == 0) continue;
      input.push(subjects[k][0]);
    }

    var regressor = catie2.getGenotypeMap(job.name,input);
    console.log(regressor);
  }
}

