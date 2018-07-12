
var path = require('path');
var csv = require('fusion/csv');
var sql = require('fusion/sql');
var catie2 = require('analysis/sources/catie2');

var dataDir = '/www/data/models';

function getSubjects(model) {
  var res = [];
  var rows = csv.csv2json(path.join(dataDir,model,model+'.csv'));
  for (var k=1;k<rows.length;k++) {
    res.push(rows[k][0]);
  }
  return res;
}

function getMAF(gene,subjects) {
  var v = catie2.getGenotypeMap(gene,subjects);
  var count = 0;
  for (var k in v) {
    if (v[k] == 1) count++
    else if (v[k] == 2) count += 2;
  }
  return Math.round(count/subjects.length*100);
}

function correlation(xs,ys) {

  var sx = 0.0;
  var sy = 0.0;
  var sxx = 0.0;
  var syy = 0.0;
  var sxy = 0.0;

  var n = xs.length;

  for(var i = 0; i < n; ++i) {
    var x = xs[i];
    var y = ys[i];

    sx += x;
    sy += y;
    sxx += x * x;
    syy += y * y;
    sxy += x * y;
  }

  // covariation
  var cov = sxy / n - sx * sy / n / n;
  // standard error of x
  var sigmax = Math.sqrt(sxx / n -  sx * sx / n / n);
  // standard error of y
  var sigmay = Math.sqrt(syy / n -  sy * sy / n / n);

  // correlation is just a normalized covariation
  return cov / sigmax / sigmay;
}

exports.main = function() {

  var a = getSubjects('Iowa_Risperidone_CAUC_CYP2D6_GSA3');
  var b = getSubjects('Risperidone_CAUC_CYP2D6_GSA');

  var mafA = [];
  var mafB = [];
  var genes = sql.data('SELECT * FROM worklist WHERE Model=1 LIMIT 1000').name;
  console.log(genes.length);
  for (var k in genes) {
    console.log('getting '+k);
    mafA.push(getMAF(genes[k],a));
    mafB.push(getMAF(genes[k],b));
  }

  var c = correlation(mafA,mafB);
  console.log(c);
}

