const http = require('http');
require('dotenv').config()
const {appli}= require('./app');
 const PORT = process.env.PORT;
 const {loadPlanets} = require('./model/planet.model')
 const {fetchSpacexData} = require('./model/launches.model')

const server = http.createServer(appli);
const mongoose = require('mongoose')
const conURL = process.env.MONGODB_URL

mongoose.connection.once('open',()=>{
    console.log("opened");
})
mongoose.connection.on('error',(err)=>{
    console.log(err);

})
async function serv (){
   await mongoose.connect(conURL,{
    
   })
   await fetchSpacexData()
    await loadPlanets()
    server.listen(PORT,()=>{
        console.log("listening");
    })
}
serv()