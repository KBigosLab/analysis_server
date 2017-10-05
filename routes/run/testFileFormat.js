
var path = require('path');
var catie2 = require('analysis/sources/catie2');
var fs = require('fusion/fs');
var csv = require('fusion/csv');

exports.main = function() {
  var res = catie2.getGenotypeMap('rs472660',["76001043","76001441"]);
  console.log(res);
}

