
var fs = require('fusion/fs');

function FileStream(filename,flags) {
  this.fd = fs.open(filename,'r');
  this.size = fs.stat(filename).size;
  this.position = 0;
}

FileStream.prototype.readInt = function() {
  var buffer = new Buffer(4);
  fs.read(this.fd,buffer,0,4,this.position);
  this.position += 4;
  return buffer.readInt32LE(0);
}

FileStream.prototype.readByte = function() {
  var buffer = new Buffer(1);
  fs.read(this.fd,buffer,0,1,this.position);
  this.position++;
  return buffer.readInt8(0);
}

FileStream.prototype.readNullTermStr = function() {
  var str = '';
  var buffer = new Buffer(1);
  var c = 1;
  while (c != 0) {
    if (c > 1) str += String.fromCharCode(c);
    fs.read(this.fd,buffer,0,1,this.position);
    this.position++;
    c = buffer.readInt8(0);
  }
  return str;
}

FileStream.prototype.readToTab = function() {
  var str = '';
  var buffer = new Buffer(1);
  var c = 1;
  while (c != 9) {
    if (c > 1) str += String.fromCharCode(c);
    fs.read(this.fd,buffer,0,1,this.position);
    this.position++;
    c = buffer.readInt8(0);
  }
  return str;
}

FileStream.prototype.readNewline = function() {
  var c = this.readByte();
  if (c != 10) throw new Error('Expected newline character at '+this.position);
  return c;
}

FileStream.prototype.readGenotype = function() {
  var buffer = new Buffer(4);
  fs.read(this.fd,buffer,0,4,this.position);
  this.position += 4;
  return [String.fromCharCode(buffer.readInt8(0)), String.fromCharCode(buffer.readInt8(2))];
}

FileStream.prototype.close = function() {
  fs.close(this.fd);
}

module.exports = FileStream;

