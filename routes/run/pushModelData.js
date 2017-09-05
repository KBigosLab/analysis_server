
var db = require('analysis/db');
var path = require('path');
var s3 = require('analysis/s3');

var modelFiles = ['Fields.txt','%.csv','%.fit.txt','%_0.ctl','%_1.ctl'];

function pushModel(name) {
  var model = db.models.getByName(name);
  for (var k in modelFiles) {
    var file = modelFiles[k].replace(/\%/g,name);
    s3.gzipAndPush(path.join(Const.dataDir,name,file),path.join(model.key,'model',file));
  }
}

exports.main = function() {
  pushModel('Olanzapine');
}

