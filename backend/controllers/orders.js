
const {Orders}=require('../models/orders')

exports.getOrders=async(req,res)=>{
    const orderList=await Orders.find();
    if(!orderList){
        res.status(500).json({success:false})
   }
   res.send(orderList)
}