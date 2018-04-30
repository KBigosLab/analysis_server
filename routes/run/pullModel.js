
var db = require('analysis/db');
var path = require('path');
var fs = require('fusion/fs');
var Shell = require('fusion/Shell');

var modelFiles = ['%.csv','%.fit.txt','%_0.ctl','%_1.ctl','%.base.txt'];

function cloneDrugModel(modelName) {
  var model = db.models.getByName(modelName);
  var drugModelDir = path.join(Const.modelsDir,modelName);
  var shell = new Shell();

  // If the drug model directory doesn't exist, create it
  if (!fs.exists(drugModelDir)) {
    fs.mkdir(drugModelDir);

    shell.cd(drugModelDir);
    for (var k in modelFiles) {
      var file = modelFiles[k].replace(/\%/g,model.name);
      var url = 'https://kb-nonmem-data.s3.amazonaws.com/'+model.key+'/model/'+file;
      shell.run('curl --compressed ? > '+file,[url]);
    }
  }
}

exports.main = function() {
  if (process.argv.length == 4) {

    cloneDrugModel(process.argv[3]);

  } else console.log('Usage: pullModel modelName');
}

