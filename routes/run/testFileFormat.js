
var path = require('path');
var catie2 = require('analysis/sources/catie2');

exports.main = function() {
  catie2.getGenotypeMap('10:73761238',['1034_2',
    '2050_2',
    '2035',
    '2078',
    '2040'
  ]);
}

