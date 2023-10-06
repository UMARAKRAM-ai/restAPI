const mongoose=require('mongoose')
const formSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            const emailtest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailtest.test(value);
          },
          message: 'Invalid email format',
        },
      },
      age: {
        type: Number, 
        required: true,
        min: 0, 
        max: 120, 
      },
      message: {
        type: String,
        required: true,
      },
    });

const FORM=mongoose.model("Form",formSchema)
module.exports=FORM