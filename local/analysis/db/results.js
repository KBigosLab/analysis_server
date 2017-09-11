
exports.post = function(jobID,data) {
  sql.query('INSERT INTO results(JobID, Data) VALUES (:0,:1) ON DUPLICATE KEY UPDATE Data=:1',arguments);
}

