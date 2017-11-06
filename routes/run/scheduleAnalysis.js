
var db = require('analysis/db');
var fs = require('fusion/fs');
var path = require('path');
var exclude = require('analysis/sources/catie2/exclude');
var _ = require('underscore');

exports.main = function() {
  if (process.argv.length == 5) {
    var model = process.argv[3];
    var cohort = process.argv[4];

    var excludeFilter = exclude.getExcludeFilter(cohort);
    var filename = path.join(Const.sourcesDir,'catie2','GSA2016_125_025_21february2017');
    var geneList = _.filter(fs.readFile(filename+'.genes','utf8').split('\n'),function(gene) { return !excludeFilter[gene] });

    for (var k in geneList) {
      if (+k % 100 == 0) console.log(k+' of '+geneList.length);
      if (geneList[k]) db.worklist.addJob(geneList[k],model);
    }
  } else console.log('Usage: scheduleAnalysis modelID CohortName');
}

