
var db = require('analysis/db');
var fs = require('fusion/fs');
var path = require('path');

function getSubjectIndex() {
  var index = {};
  var filename = path.join(Const.sourcesDir,'catie2','GSA2016_125_025_21february2017');
  var subjectList = fs.readFile(filename+'.subj','utf8').split('\n');
  var subjects = [];
  for (var k in subjectList) {
    var parts = subjectList[k].split('=');
    index[parts[0]] = true;
  }

  return index;
}

exports.main = function() {
  if (process.argv.length == 4) {
    var modelName = process.argv[3];

    var model = db.models.getByName(modelName);

    var subjIndex = getSubjectIndex();

    var lines = fs.readFile(path.join(Const.modelsDir,model.name,model.name+'.csv'),'utf8').split('\n');
    var res = [lines[0]];
    for (var k=1;k<lines.length;k++) {
      var row = lines[k].split(',');
      if (subjIndex[row[0]]) res.push(lines[k]);
    }
    fs.writeFile(path.join(Const.modelsDir,model.name,model.name+'.csv.filtered'),res.join('\n'));
    console.log('Wrote '+model.name+'.csv.filtered');
  }
}

