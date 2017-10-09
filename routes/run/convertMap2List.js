
var path = require('path');
var MapFileReader = require('analysis/sources/catie2/MapFileReader');

exports.main = function() {
  var dataFilename = 'GSA2016_125_025_21february2017';

  var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);
  var map = new MapFileReader(filepath+'.map');
  console.log(map.rows.length);
  map.saveToList(filepath+'.genes');
  console.log('success');
}

