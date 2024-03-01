const {getLaunchesmong,setLaunch,haveElementById,removeLaunch} = require('../../model/launches.model')
const getPagination = require('../../services/query')

async function httpgetAllLaunches(req,res) {
    
   const {skip ,limit } = getPagination(req.query)
    res.status(200).json(await getLaunchesmong(skip,limit))
    
}
async function httpAddNewLaunches(req , res) {

    const obj = req.body;
    if (!obj.mission || !obj.rocket || !obj.launchDate || !obj.destination) {
        return res.status(400).json({
            error:"field error"
        })
        
    }
    obj.launchDate = new Date(req.body.launchDate)
    if (isNaN(obj.launchDate)) {
        return res.status(400).json({
            error:"date error"
        })
        
    }
   await setLaunch(obj)
    

   return res.status(200).json(obj)


    
}
async function httpDeleteLaunch(req,res) {


    const id = +req.params.id
     const hvel = await haveElementById(id)
    if (!hvel) {

        return res.status(400).json({
            error:"no data found",
            datatype:typeof(id),
            param:id
        })
        
    }
    const data = await removeLaunch(id)
    if (!data) {
        return res.status(400).json({
            error :"something went wrong"
        })

        
    }
    return res.status(200).json({
        success:true
    })
    
}
module.exports={
    httpgetAllLaunches,
    httpAddNewLaunches,
    httpDeleteLaunch
}