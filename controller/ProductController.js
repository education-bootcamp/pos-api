const ProductSchema= require('../model/ProductSchema');




const create=(req,resp)=>{
    const product = new ProductSchema({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        unitPrice:req.body.unitPrice,
        qtyOnHand:req.body.qtyOnHand
    });
    product.save().then(response=>{
        resp.status(201).json({'message':'Product saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const findById=(req,resp)=>{
    ProductSchema.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
            return  resp.status(200).json({'data':selectedObj});
        }
        return resp.status(404).json({'message':'customer not found!'});
    });
}
const update=async (req,resp)=>{
    const updateData = await ProductSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            name:req.body.name,
            description:req.body.description,
            image:req.body.image,
            unitPrice:req.body.unitPrice,
            qtyOnHand:req.body.qtyOnHand
        }
    },{new:true});

    if(updateData){
        return  resp.status(200).json({'message':'updated'});
    }else{
        return resp.status(500).json({'message':'internal server error'});
    }
}
const deleteById=(req,resp)=>{}
const findAll=(req,resp)=>{}

module.exports={
    create,findById,update,deleteById,findAll
}