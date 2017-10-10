
exports.requires = function($P) {
}

exports.main = function($P) {
  $P.res.write('Access denied');
  $P.res.end();
}

