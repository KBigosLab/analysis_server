
var sql = require('fusion/sql');
var fs = require('fusion/fs');

exports.main = function() {
/*
  var resultsA = sql.query('SELECT Name,{Summary} FROM worklist WHERE Model=11');
  fs.writeFile(rootDir+'resultsA.json',JSON.stringify(resultsA));
  console.log(resultsA.length);

  var resultsB = sql.query('SELECT Name,{Summary} FROM worklist WHERE Model=24');
  fs.writeFile(rootDir+'resultsB.json',JSON.stringify(resultsB));
  console.log(resultsB.length);
*/

  var resultsA = JSON.parse(fs.readFile(rootDir+'resultsA.json'));
  var resultsB = JSON.parse(fs.readFile(rootDir+'resultsB.json'));

  var index = {};
  var count = 0;
  for (var k in resultsB) {
    if (+resultsB[k].summary.ChiDist < 1e-8) {
      index[resultsB[k].name] = true;
    }
  }

  for (var k in resultsA) {
    if (+resultsA[k].summary.ChiDist < 1e-8) {
      count++;
    }
  }
  console.log(count);
}

