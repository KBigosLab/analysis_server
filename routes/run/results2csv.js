
var db = require('analysis/db');
var fs = require('fusion/fs');

function createSchema(output,summary) {
  var row = ['id','name'];

  for (var key in summary)
    row.push(key);

  output.csv = row.join(',')+'\n';

  return row;
}

exports.main = function() {
  var model = 1;

  var output = {csv: ''};
  var res = db.worklist.getResults(model);
  var schema = null;
  for (var k in res) {
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

  fs.writeFile(rootDir+'output.csv',output.csv);
}

