
var fs = require('fusion/fs');

function FileStream(filename,flags) {
  this.fd = fs.openSync(filename,'r');
  this.position = 0;
}

FileStream.prototype.readInt = function() {
  var buffer = new Buffer(4);
  fs.readSync(this.fd,buffer,0,4,this.position);
  this.position += 4;
  return buffer.readInt32LE(0);
}

FileStream.prototype.readByte = function() {
  var buffer = new Buffer(1);
  fs.readSync(this.fd,buffer,0,1,this.position);
  this.position++;
  return buffer.readInt8(0);
}

FileStream.prototype.readNullTermStr = function() {
  var str = '';
  var buffer = new Buffer(1);
  var c = 1;
  while (c != 0) {
    if (c > 1) str += String.fromCharCode(c);
    fs.readSync(this.fd,buffer,0,1,this.position);
    this.position++;
    c = buffer.readInt8(0);
  }
  return str;
}

FileStream.prototype.close = function() {
  fs.close(this.fd);
}

module.exports = FileStream;

