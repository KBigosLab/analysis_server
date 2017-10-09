
var csv = require('fusion/csv');
var path = require('path');

function CATIEKey() {
  this.convert = {};
  var rows = csv.csv2json(path.join(Const.sourcesDir,'catie_orig','CATIE_Key_convert02Cto76.csv'));
  for (var k in rows) {
    this.convert[rows[k][1]] = rows[k][0];
  }
}

CATIEKey.prototype.to76 = function(cell) {
  if (cell[0] == '_') cell = cell.slice(1);
  if (cell[cell.length-1] == 'A') cell = cell.slice(0,cell.length-1);
  return this.convert[cell];
}

module.exports = CATIEKey;

