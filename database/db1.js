const {createPool} = require('mysql')

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"mobile",
    connectionLimit:10
    
})
pool.query("CALL INSERT_USERS(2,'pa','pa56','kkk');",(err ,result ,fields)=>{
    if(err){
        return console.log(err);
    }
     console.log(result);
     return;
})