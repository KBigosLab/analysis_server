
var db = require('analysis/db');

var list = [
  '1.792429',
  '1.819185',
  '1.832343',
  '1.838664',
  '1.839326',
  '1.1043552',
  '1.1061338',
  '1.1106326',
  '1.1137258',
  '1.19153077',
  '1.19153636',
  '2.102496',
  '2.105035',
  '2.119028',
  '2.121788',
  '2.129743',
  '2.160576',
  '2.166395',
  '2.186973',
  '2.196704',
]

exports.main = function() {
  for (var k in list)
    db.worklist.addJob(list[k],2);
}

