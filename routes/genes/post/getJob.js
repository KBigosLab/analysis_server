
exports.expects = {
  worker: {type: 'string'},
}

exports.requires = function($P) {
}

exports.main = function($P) {

  $P.json({test: $P.args.testArg});
}

