
var db = require('analysis/db');
var path = require('path');
var s3 = require('analysis/s3');
var keygen = require('analysis/keygen');

exports.expects = {
  name: {type: 'string', required: true},
}

exports.requires = function($P) {
  $P.require.auth();
}

exports.main = function($P) {
  var model = $P.args.name;

  if (!db.models.getByName(model)) {
    var key = keygen.generate();
    db.models.add(model,key);
    $P.json({key: key});
  } else $P.json({error: 'Already registered!'});
}

