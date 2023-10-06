let express=require('express')
let app=express()
const dotenv=require('dotenv')
const bodyparser=require('body-parser')
const userapis=require('./routes/user')
const formapis=require('./routes/form')
const mongoose=require("./config/connection")
dotenv.config()

let port=process.env.PORT ||8080;
app.use(bodyparser.json())
app.use(express.static("Public"));
app.use('/user', userapis)
app.use('/form',formapis)
app.listen(port, "localhost",(res,req,next)=>{
console.log(`server starting at http://localhost:${port}`)
})

