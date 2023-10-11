


const mongoose=require('mongoose')
const Url="mongodb+srv://umarakram:123UMAR@cluster0.naiejop.mongodb.net/"
mongoose.connect(Url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connected Successfully !!!')
})

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection fail"))

module.exports=mongoose