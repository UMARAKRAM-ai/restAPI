const dotenv=require('dotenv')
dotenv.config()

const mongoose=require('mongoose')
const Url=process.env.URI 
mongoose.connect(Url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connected Successfully !!!')
})

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection fail"))

module.exports=mongoose