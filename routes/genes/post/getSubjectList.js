
var fs = require('fusion/fs');
var path = require('path');

exports.expects = {
}

exports.requires = function($P) {
  $P.require.auth();
}

exports.main = function($P) {
  var subjects = [];
  var filename = path.join(Const.sourcesDir,'catie2','GSA2016_125_025_21february2017');
  var subjectList = fs.readFile(filename+'.subj','utf8').split('\n');
  for (var k in subjectList) {
    var parts = subjectList[k].split('=');
    subjects.push(parts[0]);
  }

  $P.json({subjects: subjects});
}

