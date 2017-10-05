
var fs = require('fusion/fs');
var csv = require('fusion/csv');
var path = require('path');
var _ = require('underscore');
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

function getGeneStats(genotypes) {
  var hist = {'x': 0};

  for (var k in genotypes) {
    var gt = genotypes[k];
    if (gt[0] != '0') {
      if (gt[0] == gt[1]) {
        if (!(gt[0] in hist)) hist[gt[0]] = 1
        else hist[gt[0]]++;
      } else hist.x++;
    }
  }

  delete hist.x;

  var alleles = _.map(hist,function(v,i) { return {allele: i, count: v} });

  if (alleles.length == 2) {
    if (alleles[0].count > alleles[1].count) return {major: alleles[0].allele, minor: alleles[1].allele}
    else return {major: alleles[1].allele, minor: alleles[0].allele};
  } else if (alleles.length == 1) return {major: alleles[0].allele}
  else throw new Error('Unexpected allele count');
}

function getGeneVector(genotypes,stats) {
  var res = {};
  for (var subj in genotypes) {
    var gt = genotypes[subj];
    if (gt[0] == 0) res[subj] = -1
    else if (gt[0] == gt[1]) {
      if (gt[0] == stats.major) res[subj] = 0
      else if (gt[0] == stats.minor) res[subj] = 2
      else res[subj] = -1;
    } else res[subj] = 1;
  }
  return res;
}

exports.getGenotypeMap = function(gene,input) {
  init();

  var stream = new FileStream(filepath+'.ped','r');

  var genePos = geneMap[gene];

  var genotypes = {};
  var startTime = new Date();
  for (var k in input) {
    var subjID = input[k];
    var loc = subjectMap[subjID];
    if (loc) {
      stream.position = +loc+8+genePos*4;
      genotypes[subjID] = stream.readGenotype();
    }
  }
  var stopTime = new Date();

  stream.close();

  var stats = getGeneStats(genotypes);

  var vector = getGeneVector(genotypes,stats);
  return vector;
}

