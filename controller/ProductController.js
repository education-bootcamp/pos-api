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
const update=(req,resp)=>{}
const deleteById=(req,resp)=>{}
const findAll=(req,resp)=>{}

module.exports={
    create,findById,update,deleteById,findAll
}