
var db = require('analysis/db');
var fs = require('fusion/fs');
var path = require('path');

exports.main = function() {
  var model = 3;


  var filename = path.join(Const.sourcesDir,'catie2','GSA2016_125_025_21february2017');
  var geneList = fs.readFile(filename+'.genes','utf8').split('\n');
  for (var k in geneList) {
    if (+k % 100 == 0) console.log(k+' of '+geneList.length);
    db.worklist.addJob(geneList[k],model);
  }
}

