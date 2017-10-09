
var fs = require('fusion/fs');

function MapFileReader(filename) {
  this.index2map = {};
  this.map2index = {};
  this.rows = [];
  var rows = fs.readFile(filename,'utf8').split('\n');
  for (var k in rows) {
    var row = rows[k].split('\t');
    this.index2map[+k+1] = row[3];
    this.map2index[row[3]] = +k+1;
  }
}

module.exports = MapFileReader;

