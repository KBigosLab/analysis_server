
var db = require('analysis/db');
var results = require('analysis/results');

exports.main = function() {
  if (process.argv.length == 4) {
    var modelName = process.argv[3];

    var model = db.models.getByName(modelName);
    if (model) {
      results.check(model.model);
    } else console.log('Could not find model '+model);

  } else console.log('Usage: results2csv ModelName');

}

