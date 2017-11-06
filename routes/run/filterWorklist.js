
var exclude = require('analysis/sources/catie2/exclude');

exports.main = function() {
  if (process.argv.length == 5) {
    var model = process.argv[3];
    var cohort = process.argv[4];
    exclude.removeJobs(model,cohort);
  } else console.log('Usage: filterWorklist modelID CohortName');
}

