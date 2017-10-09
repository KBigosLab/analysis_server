# analysis_server
Server for managing analysis checkouts and data uploads

## Creating a new model
```
node run registerModel modelName
node run filterSubjectData modelName
node run pushModel modelName
```
After `filterSubjectData` runs, the `modelName.csv` file needs to be replaced by `modelName.csv.filtered`. The `.fit.txt` file should be inspected for the post hoc analysis. The base model needs to be updated after the initial push but before the actual live analysis runs.
