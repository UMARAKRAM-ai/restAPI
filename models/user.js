const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
      type: String,
      enum: ['customer','admin','HR','Manager'],
      default: 'customer'
  },
 
})

const Todo=mongoose.model("User",todoSchema)
module.exports=Todo



 