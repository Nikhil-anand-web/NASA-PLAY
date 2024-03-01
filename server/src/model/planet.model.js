const parse = require('csv-parse');
const fs = require('fs');
const path = require('path')

const planetsMongo = require('./planets.mongo');



function ishabitable(planet) {
  return planet['koi_disposition']==='CONFIRMED'&&planet['koi_insol']>0.36&&planet['koi_insol']<1.11&&planet['koi_prad']<1.6;
}
async function loadPlanets(){
fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', async function (data) {
    if (ishabitable(data)) {
     await savePlanet(data)
      
    }
    
  })
  .on('error', (err) => {
    console.error(err.message);
  })
  .on('end', async () => {
    console.log((await getAllPlanets()).length);
   
  });


}
async function getAllPlanets() {
  return await planetsMongo.find({},{
    _id:0,
    __v:0
  })
  
}
async function savePlanet(data) {
  try{
   await planetsMongo.updateOne({
    kepler_name:data.kepler_name
    },{
      kepler_name: data.kepler_name
    },{
      upsert : true
    })
   

  }catch(err){
    console.error(err)
  }


 

  
}


module.exports={
    loadPlanets,
    getAllPlanets
}