
var db = require('analysis/db');
var results = require('analysis/results');
var path = require('path');

exports.main = function() {
  if (process.argv.length == 4) {
    var modelName = process.argv[3];

    var model = db.models.getByName(modelName);
    if (model) {
      results.writeCSV(model.model);
      results.pushCSV(model.model);

      console.log('Done uploading results. Model info and data can be found at:');
      console.log('Results: '+Const.amazonS3+'/'+path.join(model.key,model.name+'.csv'));
      console.log('Subject input data: '+Const.amazonS3+'/'+path.join(model.key,'model',model.name+'.csv'));
      console.log('Base model: '+Const.amazonS3+'/'+path.join(model.key,'model',model.name+'_0.ctl'));
      console.log('Gene model: '+Const.amazonS3+'/'+path.join(model.key,'model',model.name+'_1.ctl'));
      console.log('Default ObjFn: '+Const.amazonS3+'/'+path.join(model.key,'model',model.name+'.base.txt'));
      console.log('Post-hoc fit columns: '+Const.amazonS3+'/'+path.join(model.key,'model',model.name+'.fit.txt'));
    } else console.log('Could not find model '+model);

  } else console.log('Usage: results2csv ModelName');

}

