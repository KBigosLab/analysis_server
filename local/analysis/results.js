
var db = require('analysis/db');
var fs = require('fusion/fs');
var s3 = require('analysis/s3');
var prompt = require('analysis/prompt');
var path = require('path');

function createSchema(output,summary) {
  var row = ['id','name'];

  for (var key in summary)
    row.push(key);

  row.push('Error');
  output.csv = row.join(',')+'\n';

  return row;
}

exports.writeCSV = function(modelID) {

  var output = {csv: ''};
  var model = db.models.get(modelID);

  var res = db.worklist.getResults(modelID);
  var schema = null;
  for (var k in res) {
    if (!res[k].summary) continue;
    try {
      var summary = JSON.parse(res[k].summary);
      if (!schema) schema = createSchema(output,summary);

      summary.id = res[k].jobID;
      summary.name = res[k].name;

      if (!summary.Error) summary.Error = 0;

      var row = [];
      for (var k in schema) {
        row.push(summary[schema[k]]);
      }

      output.csv += row.join(',')+'\n';
    } catch(e) {

    }
  }

  fs.writeFile(Const.resultsDir+model.name+'.csv',output.csv);
}

exports.check = function(modelID) {

  var model = db.models.get(modelID);

  var errors = [];
  var incomplete = [];
  var res = db.worklist.getEntireWorklist(modelID);
  for (var k in res) {

    if (!res[k].summary) {
      incomplete.push(res[k]);
      continue;
    }
    try {
      var summary = JSON.parse(res[k].summary);

      if (!summary.Drop && !summary.Error) errors.push(res[k]);
    } catch(e) {
      errors.push(res[k]);
    }
  }

  var wantsReset = prompt(incomplete.length+' remaining. Reset? (y/n) :');
  if (wantsReset == 'y') for (var k in incomplete) db.worklist.resetDeadJob(incomplete[k].jobID);

  var wantsReset = prompt(errors.length+' errors. Reset? (y/n) :');
  if (wantsReset == 'y') for (var k in errors) db.worklist.resetDeadJob(errors[k].jobID);
}

exports.pushCSV = function(modelID) {
  var model = db.models.get(modelID);
  s3.gzipAndPush(Const.resultsDir+model.name+'.csv',path.join(model.key,model.name+'.csv'),{
    ContentType: 'text/csv',
  });
}

