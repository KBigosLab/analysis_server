
var db = require('analysis/db');
var csv = require('fusion/csv');
var path = require('path');
var fs = require('fusion/fs');
var catie2 = require('analysis/sources/catie2');

var dataFilename = 'GSA2016_125_025_21february2017';
var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);

exports.main = function() {
  var model = db.models.get(3);

  var subjects = csv.csv2json(path.join(Const.modelsDir,model.name,model.name+'.csv'));
  var index = {};
  for (var k in subjects) {
    if (k == 0) continue;
    index[subjects[k][0]] = true;
  }
  var input = [];
  for (var id in index) input.push(id);

  var geneList = fs.readFile(filepath+'.genes','utf8').split('\n');

  for (var k in geneList) {
    var regressor = catie2.getGenotypeMap(geneList[k],input);
    for (var j in regressor) {
      if (regressor[j] == -1) {
        console.log(geneList[k]);
      }
    }
  }

}

