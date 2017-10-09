
var db = require('analysis/db');
var path = require('path');
var s3 = require('analysis/s3');
var keygen = require('analysis/keygen');

exports.main = function() {
  if (process.argv.length == 4) {
    var model = process.argv[3];

    if (!db.models.getByName(model))
      db.models.add(model,keygen.generate())
    else console.log('Already registered!');

  } else console.log('Usage: registerModel ModelName');
}

