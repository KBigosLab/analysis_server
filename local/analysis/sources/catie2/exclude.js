
var db = require('analysis/db');
var fs = require('fusion/fs');
var path = require('path');
var _ = require('underscore');

var dataFilename = 'GSA2016_125_025_21february2017';
var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);

function getExcludeList(name) {
  return JSON.parse(fs.readFile(filepath+'_'+name+'.exclude','utf8'));
}

exports.getExcludeFilter = function(name) {
  return _.indexBy(getExcludeList(name),_.identity);
}

exports.removeJobs = function(model,name) {
  var list = getExcludeList(name);
  for (var k in list) {
    db.worklist.removeJob(list[k],model);
  }
}

