const express = require('express')
const launchesRouter = express.Router();

const {httpgetAllLaunches,httpAddNewLaunches,httpDeleteLaunch} = require('./launches.controller')
launchesRouter.get('/',httpgetAllLaunches)
launchesRouter.post('/',httpAddNewLaunches)
launchesRouter.delete('/:id',httpDeleteLaunch)

module.exports={
    launchesRouter
}
 