
var uuid = require('node-uuid');
var crypto = require('crypto')

// This matches express's uid function. It was created so we could
// write custom session code.
exports.uid = function(len) {
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
    .toString('base64')
    .slice(0, len);
}

exports.generate = function() {
  var buf = new Buffer(32);
  uuid.v4(null,buf);
  var key = buf.toString('base64').slice(0,16);

  buf = new Buffer(32);
  uuid.v4(null,buf);
  key += buf.toString('base64').slice(0,16);

  return key.replace(/\+/g,'_').replace(/\//g,'-');
}


