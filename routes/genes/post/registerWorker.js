
exports.expects = {
  ip: {type: 'string', required: true},
}

exports.requires = function($P) {
}

exports.main = function($P) {

  $P.json({workerID: 1});

}

