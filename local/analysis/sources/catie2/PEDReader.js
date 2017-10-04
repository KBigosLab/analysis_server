
var fs = require('fusion/fs');
var FileStream = require('analysis/FileStream');

function PEDReader(filename) {
  this.filename = filename;
  this.stream = new FileStream(filename+'.ped','r');
}

PEDReader.prototype.createSubjectIndex = function() {
  var list = fs.readFile(this.filename+'.genes','utf8').split('\n');

  if (!list[list.length-1]) list.length = list.length-1;

  var subjects = [];
  while (this.stream.position < this.stream.size) {
    var idx = this.stream.readToTab();
    var subjID = this.stream.readToTab();

    subjects.push({idx: idx, subjID: subjID, pos: this.stream.position});
    this.stream.position += (list.length+2)*4;
    this.stream.readNewline();
  }

  var lines = '';
  for (var k in subjects) {
    lines += subjects[k].subjID+'='+subjects[k].pos+'\n';
  }
  fs.writeFile(this.filename+'.subj',lines);
}

module.exports = PEDReader;

