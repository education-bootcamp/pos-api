const CustomerSchema= require('../model/CustomerSchema');

const create=(req,resp)=>{
    const customer = new CustomerSchema({
        name:req.body.name,
        address:req.body.address,
        salary:req.body.salary
    });
    customer.save().then(response=>{
        resp.status(201).json({'message':'customer saved!'});
    }).catch(error=>{
        return resp.status(500).json(error);
    });
}
const findById=(req,resp)=>{
    CustomerSchema.findOne({'_id':req.params.id}).then(selectedObj=>{
        if(selectedObj!=null){
           return  resp.status(200).json({'data':selectedObj});
        }
        return resp.status(404).json({'message':'customer not found!'});
    });
}
const update= async (req,resp)=>{
    const updateData = await CustomerSchema.findOneAndUpdate({'_id':req.params.id},{
        $set:{
            name:req.body.name,
            address:req.body.address,
            salary:req.body.salary
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