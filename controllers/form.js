

const FORM=require('../models/form')

//single entry filling in my form
const CreateData=async(req , res)=> {
    try {
        const{name, email, age, message}=req.body
        const form= new FORM({
            name,
            email,age,message
        })
        await form.save()
        res.json(form)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

//Getting All data from form
const getAllForm=async(req,res)=> {
    try{
    const forms = await FORM.find()
    res.json(forms)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


const insertManyData = async (req, res) => {
    try {
      const formDataArray = req.body;
      const insertedForms = await FORM.insertMany(formDataArray);
      res.status(201).json({ message: 'Forms submitted successfully', insertedForms });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const deleteFormById=async(req , res)=> {
    try{
        let FormData= await FORM.findByIdAndDelete(req.params.id)
    if(!FormData){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json({message:'Deleted Successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateFormByID=async(req,res)=>{
    try{
        const{name, email, age, message}=req.body
        let dataById= await FORM.findByIdAndUpdate(req.params.id,{name, email, age, message},
            {new:true})
            if(!dataById){
                return res.status(404).json({message:"DATA NOT FOUND"})
            }
            res.json(dataById)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


module.exports={
    CreateData,getAllForm,insertManyData,deleteFormById,updateFormByID
}