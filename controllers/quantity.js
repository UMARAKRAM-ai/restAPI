const Quantity=require('../models/quantity')

const createQuantity= async(req,res,next)=>{

    try{
        const {productId, values}=req.body
        const quantity=new Quantity({
            productId,
            values
        })
        await quantity.save();
        res.status(201).json({message:"Quantity created Succesfully"})
    }catch(error){
        next(error);

    }

}


const getQuantityByProductId=async(req,res,next)=>{

    try{
        const {productId}=req.params
        const quantities=await Quantity.find({productId}).populate("productId")

        res.status(200).json(quantities)
    }catch(error){
        next(error)
    }
}

module.exports={
    createQuantity, getQuantityByProductId
}