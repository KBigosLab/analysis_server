
var fs = require('fusion/fs');

function MapFileReader(filename) {
  this.rows = [];
  var rows = fs.readFile(filename,'utf8').split('\n');

  var index = {};
  for (var k in rows) {
    var row = rows[k].split('\t');

    if (index[row[1]]) throw new Error('duplicate id');
    index[row[1]] = rows[k];

    this.rows.push(row);
  }
}

MapFileReader.prototype.saveToList = function(filename) {
  var list = '';
  for (var k in this.rows)
    if (this.rows[k][1]) list += this.rows[k][1]+'\n';
  fs.writeFile(filename,list);
}

module.exports = MapFileReader;

