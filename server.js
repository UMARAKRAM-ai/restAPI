let express=require('express')
let app=express()
const dotenv=require('dotenv')
const bodyparser=require('body-parser')
const userapis=require('./routes/user')
const formapis=require('./routes/form')
const signup=require('./routes/loginsystem')
const mongoose=require("./config/connection")

const productApi=require('./routes/products')
const quantityApi=require('./routes/quantity')


dotenv.config()

let port=process.env.PORT ||8080;
app.use(bodyparser.json())
app.use(express.static("Public"));


app.use('/', productApi)
app.use('/', quantityApi)
app.use('/user', userapis)
app.use('/form',formapis)
app.use('/loginuser',signup)
app.listen(port, "localhost",(res,req,next)=>{
console.log(`server starting at http://localhost:${port}`)
})

