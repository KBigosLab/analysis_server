
var path = require('path');
var fs = require('fusion/fs');
var db = require('analysis/db');
var csv = require('fusion/csv');
var catie2 = require('analysis/sources/catie2');
var sleep = require('fusion/sleep');
var _ = require('underscore');

var dataFilename = 'GSA2016_125_025_21february2017';
var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);

function getFullSubjectList() {
  var index = {};
  var subjectList = fs.readFile(filepath+'.subj','utf8').split('\n');
  for (var k in subjectList) index[subjectList[k].split('=')[0]] = true;
  return _.map(index,function(v,i) { return i });
}

function getSubjectsForModel(model) {
  console.log(path.join(model.name,model.name+'.csv'));
  var subjects = csv.csv2json(path.join(Const.modelsDir,model.name,model.name+'.csv'));
  var index = {};
  for (var k in subjects) {
    if (k == 0) continue;
    index[subjects[k][0]] = true;
  }
  var input = [];
  for (var id in index) input.push(id);
  return input;
}

function getHistogram(regressor) {
  var hist = {'0':0, '1':0, '2':0, '-1':0};
  for (var k in regressor) hist[regressor[k]]++;
  return hist;
}

exports.main = function() {

  var startAt = +process.argv[3];
  var chunkSize = 50000;

  var input_full = getFullSubjectList();

  var model = db.models.get(8);
  var input_CAUC = getSubjectsForModel(model);

  var model = db.models.get(9);
  var input_AA = getSubjectsForModel(model);

  var geneList = fs.readFile(filepath+'.genes','utf8').split('\n');

  var output = '';

  for (var k=startAt*chunkSize;k<geneList.length/*k<(startAt+1)*chunkSize*/;k++) {
    var row = [];
    row.push(geneList[k]);

    var counts = getHistogram(catie2.getGenotypeMap(geneList[k],input_CAUC));
    row.push(counts[0]); row.push(counts[1]); row.push(counts[2]);
    row.push('');

    var counts = getHistogram(catie2.getGenotypeMap(geneList[k],input_AA));
    row.push(counts[0]); row.push(counts[1]); row.push(counts[2]);

    output += row.join(',')+'\n';
    console.log(+k);

    if (k > 100 && k % 1000 == 0) sleep(1500);
  }
  fs.writeFile(filepath+'.hist.'+startAt,output);
}

