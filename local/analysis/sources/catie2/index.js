
var fs = require('fusion/fs');
var csv = require('fusion/csv');
var path = require('path');
var FileStream = require('analysis/FileStream');

var dataFilename = 'GSA2016_125_025_21february2017';
var filepath = path.join(Const.sourcesDir,'catie2',dataFilename);

var geneMap = {};
var subjectMap = {};

var init = require('fusion/init')(function() {
  var geneList = fs.readFile(filepath+'.genes','utf8').split('\n');
  for (var k in geneList)
    geneMap[geneList[k]] = k;

  var subjects = fs.readFile(filepath+'.subj','utf8').split('\n');
  for (var k in subjects) {
    var parts = subjects[k].split('=');
    subjectMap[parts[0]] = parts[1];
  }
});

exports.getGenotypeMap = function(gene,input) {
  init();

  var stream = new FileStream(filepath+'.ped','r');

  var genePos = geneMap[gene];

  var startTime = new Date();
  for (var k in input) {
    var subjID = input[k];
    var loc = subjectMap[subjID];
    if (loc) {
      stream.position = +loc+8+genePos*4;
      var genotype = stream.readGenotype();
      console.log(genotype);
    }
  }
  var stopTime = new Date();

  stream.close();

  console.log(input.length);
  console.log(stopTime - startTime);
  return res;
}

