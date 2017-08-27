
exports.post = function(jobID,data) {
  sql.query('INSERT INTO results(JobID, Data) VALUES (:)',arguments);
}

