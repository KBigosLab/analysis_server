
var path = require('path');
var MapFileReader = require('analysis/sources/catie2/MapFileReader');
var PEDReader = require('analysis/sources/catie2/PEDReader');

exports.main = function() {
  var dataFilename = 'GSA2016_125_025_21february2017';
  var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);
  var ped = new PEDReader(filepath);
  ped.createSubjectIndex();
}

