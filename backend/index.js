const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
  }))

app.get("/",async(req,res)=>{
    try{
        return res.status(200).json({status:"success", message:"lead app testing"})
    }catch(error){
        return res.status(500).json({status:"failure", message:error.message})
    }
})

app.listen(8000,()=>{
    console.log("running on port 8000");
})