
var path = require('path');
var csv = require('fusion/csv');
var fs = require('fusion/fs');
var _ = require('underscore');

var dataFilename = 'GSA2016_125_025_21february2017';
var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);

function calcMAF(row,offset) {
  var major = +row[offset];
  var het = +row[offset+1];
  var minor = +row[offset+2];
  return (2*minor + het)/(2*(major+minor+het));
}

function printMAF(row,offset) {
  return {
    maf: calcMAF(row,offset),
    het: +row[offset+1],
    minor: +row[offset+2],
  }
}

exports.main = function() {
  var rows = csv.csv2json(filepath+'.hist');

  var cauc = {};
  var aa = {};

  for (var k in rows) {
    var name = rows[k][0];
    if (calcMAF(rows[k],1) < 0.05) cauc[name] = printMAF(rows[k],1);
    if (calcMAF(rows[k],5) < 0.05) aa[name] = printMAF(rows[k],5);
  }

  fs.writeFile(filepath+'_CAUC.exclude',JSON.stringify(_.map(cauc,function(v,i) { return i })));
  fs.writeFile(filepath+'_AA.exclude',JSON.stringify(_.map(aa,function(v,i) { return i })));
}

