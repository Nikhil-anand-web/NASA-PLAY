const launchesMongo = require('./launch.mongo')
const planetsMongo = require('./planets.mongo')
const getExtData = require('../../../test')

let latestlaunch = 100;
const launch ={
    flightNumber:999,
    mission:'kepler pulsar',
    rocket:'LMK MK3',
    launchDate : new Date('December 27, 2030'),
    destination : 'Kepler-1652 b',
    customer:['IAF','NASA'],
    upcoming : true,
    success:true
}



// setLaunch(launch)//by calling this function function increases flight number and then after it checks for mongo db

async function fetchSpacexData() {
    const dataArray = getExtData()
   
    dataArray.forEach(async (rs) => {
        const obj = {
            flightNumber:rs['flight_number'],
            mission:rs['name'],
            rocket:"unknown",
            launchDate:rs['date_local'],
            upcoming:rs['upcoming'],
            success:rs['success'],
            customers:['nasa',"drpa"]

        }
        // console.log(obj);
        await saveLaunche(obj);
        console.log(obj);
       
        
    });
    
    
    
    
}

async function getLaunchesmong(ski,limi) {
    return await launchesMongo.find({}).sort({flightNumber:1}).skip(ski).limit(limi)
    
}
async function saveLaunche(data) {
    try {
        // const prs= await planetsMongo.findOne({
        //     kepler_name:data.destination
        
        //     })
        //     if (!prs) {
        //         throw new Error("planet not present")
                
        //     }
        await launchesMongo.findOneAndUpdate({ //this property only return the propertywhich we set
            flightNumber:data.flightNumber
        },data,{
            upsert:true
        })
        
    } catch (error) {
        console.error(error);
        
    }
   
    
}
async function getToBeAssFlightNumber() {
   const fln= await launchesMongo.findOne().sort('-flightNumber');
   if (!fln) {
    return 100;
    
   }
   return fln.flightNumber+1
    
}
async function setLaunch(launch) {
    const prs= await planetsMongo.findOne({
        kepler_name:launch.destination
    
        })
        if (!prs) {
            throw new Error("planet not present")
            
        }
   
    const obj = {
        ...launch,
        success:true,
        upcoming:true,
        customer:["zero to mastery","NASA"],
        flightNumber:await getToBeAssFlightNumber()

    }
   
    console.log(obj);
    
    saveLaunche(obj);

    // launches.set(latestlaunch , Object.assign(launch,{
    //     success:true,
    //     upcoming:true,
    //     customer:["zero to mastery","NASA"],
    //     flightNumber:latestlaunch
    // }))


    
}

async function haveElementById(id) {

 const el = await launchesMongo.findOne({
        flightNumber : id
    })
    if (!el) {
        return false
        
    }else {
        return true
    }
    
}
async function removeLaunch(id) {
   const res = await launchesMongo.updateOne({
        flightNumber:id
    },{
        upcoming:false,
        success : false

    })
    console.log(res);
    return res.acknowledged 

//    const obj =  launches.get(id)
//    obj.upcoming=false
//    obj.success = false
//    return obj
    
}

module.exports={
    getLaunchesmong,
    setLaunch,
    haveElementById,
    removeLaunch,
    fetchSpacexData
}