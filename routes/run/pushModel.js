
var db = require('analysis/db');
var path = require('path');
var s3 = require('analysis/s3');

var modelFiles = ['%.csv','%.fit.txt','%_0.ctl','%_1.ctl','%.base.txt'];

function pushModel(name) {
  var model = db.models.getByName(name);
  for (var k in modelFiles) {
    var file = modelFiles[k].replace(/\%/g,name);
    s3.gzipAndPush(path.join(Const.modelsDir,name,file),path.join(model.key,'model',file));
  }
}

exports.main = function() {
  if (process.argv.length == 4) {
    var model = process.argv[3];

    pushModel(model);
  } else console.log('Usage: registerModel ModelName');
}

