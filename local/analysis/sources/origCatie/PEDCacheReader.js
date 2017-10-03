
var Fiber = require('fibers');
var FileStream = require('analysis/FileStream');

function PEDCacheReader(filename) {
  this.stream = new FileStream(filename,'r');

  this.subjCount = this.stream.readInt();
  this.geneCount = this.stream.readInt();
  this.subjectList = [];

  for (var k=1;k<=this.subjCount;k++) {
    var subj = this.stream.readNullTermStr();
    this.subjectList.push(subj);
  }

  this.geneDataOffset = this.stream.position;
}

PEDCacheReader.prototype.seekGene = function(index) {
  this.stream.position = this.geneDataOffset+(this.subjCount+1)*(index-1);
  var code = this.stream.readByte();
  this.major = this.getMajor(code);
  this.minor = this.getMinor(code);
  this.geneVector = [];
  for (var k=1;k<=this.subjCount;k++) {
    this.geneVector.push(this.convert(this.stream.readByte()));
  }
}

var map = {
  0: '0',
  1: 'A',
  2: 'T',
  3: 'C',
  4: 'G',
}

PEDCacheReader.prototype.getMajor = function(code) {
  return map[code & 0xF];
}

PEDCacheReader.prototype.getMinor = function(code) {
  return map[(code & 0xF0) >> 4];
}

PEDCacheReader.prototype.convert = function(code) {
  var a1 = this.getMajor(code);
  var a2 = this.getMinor(code);
  if (a1 != a2) return 1
  else if (a1 == '0') return -1
  else if (a1 == this.major) return 0
  else if (a1 == this.minor) return 2;
}

PEDCacheReader.prototype.close = function(index) {
  this.stream.close();
}

module.exports = PEDCacheReader;

