
const Todo= require("../models/user")
const createData=async(req , res)=> {
    try {
        const{name, email, password}=req.body
        const todo= new Todo({
            name,
            email,password
        })
        await todo.save()
        res.json(todo)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getAllData=async(req,res)=> {
    try{
    const getmongo = await Todo.find()
    res.json(getmongo)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getById=async(req , res)=> {
    try{
    let dataAgainstId = await Todo.findById(req.params.id)
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getSingleDataWithQuery = async (req, res)=>{
    try{
      const getTodo = await Todo.findOne({_id: req.query.id});
        res.json(getTodo)
    } catch(error){
      res.status(500).json({error: error.message});
    }
  }


  const deleteById=async(req , res)=> {
    try{
    let dataAgainstId = await Todo.findByIdAndDelete(req.params.id)
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json({message:'Deleted Successfully'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateById=async(req , res)=> {
    try{


    const {name,email,password}=req.body;
    let dataAgainstId = await Todo.findByIdAndUpdate(req.params.id,{name,email,password},
        {new:true})
    if(!dataAgainstId){
        return res.status(404).json({message:"DATA NOT FOUND"})
    }
    res.json(dataAgainstId)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports={
    createData,
    getAllData,
    getById,
    getSingleDataWithQuery,
    deleteById,
    updateById
}