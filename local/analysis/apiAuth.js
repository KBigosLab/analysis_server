
exports.authorize = function($P,validKey) {
  if ('authorization' in $P.req.headers) {
    var auth = $P.req.headers.authorization;
    console.log('*** Authorizing '+auth);
    return auth == 'Basic '+(new Buffer(validKey+':').toString("base64"));
  } else return false;
}

