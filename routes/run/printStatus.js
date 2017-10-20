
var db = require('analysis/db');
var moment = require('moment-timezone');

function printHist(completed) {
  for (var k in completed) {
    console.log(k+':  '+completed[k]);
  }
}

exports.main = function() {
  var workerIndex = {};
  var workers = db.workers.getWorkers();
  for (var k in workers) {
    workers[k].completed = {};
    workerIndex[workers[k].workerID] = workers[k];
  }

  var list = db.worklist.getRecentJobs();
  for (var k in list) {

    var hours = moment().diff(list[k].checkin,'hours');

    var worker = workerIndex[list[k].workerID];
    if (worker) {
      if (!(hours in worker.completed)) worker.completed[hours] = 1
      else worker.completed[hours]++;
    }
  }

  for (var k in workers) {
    var worker = workers[k];
    console.log();
    console.log('Worker '+worker.workerID+' '+worker.ID);
    console.log('----------------------------------------------');
    printHist(worker.completed);
    console.log();
    console.log();
    console.log();
  }
}

