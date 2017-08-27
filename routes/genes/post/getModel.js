
exports.expects = {
  testArg: {type: 'integer',}
}

exports.requires = function($P) {
}

exports.main = function($P) {

  $P.json({test: $P.args.testArg});
}

