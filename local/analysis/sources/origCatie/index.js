
var fs = require('fusion/fs');
var csv = require('fusion/csv');
var path = require('path');
var CATIEKey = require('./CATIEKey');
var PEDCacheReader = require('./PEDCacheReader');
var MapFileReader = require('./MapFileReader');

var genotypes = null;

var init = require('fusion/init')(function() {
  genotypes = JSON.parse(fs.readFile(path.join(Const.sourcesDir,'debug.json'),'utf8'));
});

exports.getGenotypeMap = function(gene,input) {
  init();

  var parts = gene.split('.');
  var cache = new PEDCacheReader(path.join(Const.sourcesDir,'catie_orig','cache','chr'+parts[0]+'.cache'));
  var map = new MapFileReader(path.join(Const.sourcesDir,'catie_orig','map','chr'+parts[0]+'.map'));

  var index = map.map2index[parts[1]];
  cache.seekGene(index);

  var key = new CATIEKey();

  var dataMap = {};
  for (var k in cache.geneVector) {
    dataMap[key.to76(cache.subjectList[k])] = cache.geneVector[k];
  }

  var res = {};
  for (var k in input)
    res[input[k]] = dataMap[input[k]];

  cache.close();

  return res;
}

