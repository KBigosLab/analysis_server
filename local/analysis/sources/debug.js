
var fs = require('fusion/fs');
var csv = require('fusion/csv');
var path = require('path');

var genotypes = null;

var init = require('fusion/init')(function() {

/*  var rows = csv.csv2json(path.join(Const.sourcesDir,'debug.csv'));
  for (var k in rows) {
    genotypes[rows[k][0]] = rows[k][1];
  }
  fs.writeFile(path.join(Const.sourcesDir,'debug.json'),JSON.stringify(genotypes));*/
  genotypes = JSON.parse(fs.readFile(path.join(Const.sourcesDir,'debug.json'),'utf8'));
});

exports.getGenotypeMap = function(gene,input) {
  init();

  var output = {};
  for (var k in input)
    output[input[k]] = genotypes[input[k]];
  return output;
}

