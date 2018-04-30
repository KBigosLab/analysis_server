# analysis_server
Server for managing analysis checkouts and data uploads

## Scheduling an analysis
```
scheduleAnalysis modelID CohortName
```
This should be run *after* running `node run import` on a client instance to import a new model. `modelID` is the numeric ID of the model and `CohortName` is `CAUC` or `AA`.
