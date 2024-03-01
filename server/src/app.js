const express = require('express')
const cors = require('cors')
const appli = express();
const path = require('path')
const morgan = require('morgan')
const {launchesRouter} = require('./routes/launches/launches.router')

const {planets} = require('./routes/planet/planels.router')
appli.use(cors({
    origin:'*'
}))
appli.use(morgan('combined'))

appli.use(express.static(path.join(__dirname,'..','public')))
appli.use(express.json());
appli.use('/planets',planets);
appli.use('/launches',launchesRouter);
appli.use('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))

})



module.exports={
    appli
}

