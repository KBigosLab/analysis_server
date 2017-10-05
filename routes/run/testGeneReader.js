
var path = require('path');
var catie2 = require('analysis/sources/catie2');
var fs = require('fusion/fs');

exports.main = function() {
  var filename = path.join(Const.sourcesDir,'catie2','GSA2016_125_025_21february2017');
  var subjectList = fs.readFile(filename+'.subj','utf8').split('\n');
  var subjects = [];
  for (var k in subjectList) {
    var parts = subjectList[k].split('=');
    if (parts[0].indexOf('76') == 0) subjects.push(parts[0]);
  }

  var geneList = fs.readFile(filename+'.genes','utf8').split('\n');
  for (var k in geneList) {
    if (+k % 100 == 0) console.log(k+' of '+geneList.length);
    if (geneList[k]) catie2.getGenotypeMap(geneList[k],subjects);
  }
}

