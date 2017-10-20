
var db = require('analysis/db');
var fs = require('fusion/fs');
var s3 = require('analysis/s3');
var path = require('path');

function createSchema(output,summary) {
  var row = ['id','name'];

  for (var key in summary)
    row.push(key);

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

exports.pushCSV = function(modelID) {
  var model = db.models.get(modelID);
  s3.gzipAndPush(Const.resultsDir+model.name+'.csv',path.join(model.key,model.name+'.csv'),{
    ContentType: 'text/csv',
  });
}

