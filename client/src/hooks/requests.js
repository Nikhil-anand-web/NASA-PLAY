
const rootURL = "http://localhost:8002"

async function httpGetPlanets() {
  const res = await fetch(`${rootURL}/planets/`)
  return res.json()

  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  const res = await fetch(`${rootURL}/launches/`);
  return res.json();
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
try {return await fetch(`${rootURL}/launches/`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(launch)
  })}catch(err){
    return{
       ok:true
    }
     
  }

}

async function httpAbortLaunch(id) {
  try{

    return await fetch(`${rootURL}/launches/${id}`,{
      method:'delete'
    })

  }catch(err){
    console.log(err);
       return{
        ok:false
       }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};