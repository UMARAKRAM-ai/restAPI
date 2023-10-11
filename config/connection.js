


const mongoose=require('mongoose')
<<<<<<< HEAD
const Url="mongodb+srv://umarakram:@cluster0.naiejop.mongodb.net/"
=======
const Url=""
>>>>>>> 8eb47889363326f30c5a65beb28670ddb1ad406a
mongoose.connect(Url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('DB connected Successfully !!!')
})

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection fail"))

module.exports=mongoose
