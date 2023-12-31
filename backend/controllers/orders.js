
const { OrderItems } = require('../models/orderItem');
const {Orders}=require('../models/orders')

exports.getOrders=async(req,res)=>{
    const orderList=await Orders.find()
    .populate('user','name').sort({'dateOrdered':-1})//sort from newest to oldest;
        .populate({path:'orderItems',populate:
            {path:'product',populate:'category'}
        })
    if(!orderList){
        res.status(500).json({success:false})
   }
   res.send(orderList)
}

exports.getSingleOrders=async(req,res)=>{
    const id=req.params.id
    const order=await Orders.findById(id).populate('user','name').sort({'dateOrdered':-1})//sort from newest to oldest;
    if(!order){
        res.status(500).json({success:false})
   }
   res.send(order)
}

exports.postOrders=async(req,res)=>{
    try{
        const orderItemIds= Promise.all(req.body.orderItems.map(async (orderItem)=>{
            let orderItemModel=new OrderItems({
                quantity:orderItem.quantity,
                product:orderItem.product
            })
            orderItemModel= await orderItemModel.save()
            return orderItemModel._id
        }))
        let orderItemIdsResolve=await orderItemIds

        let totalPrice=await Promise.all(orderItemIdsResolve.map(async (orderItemId)=>{
            const orderItem=await OrderItems.findById(orderItemId).populate('price');
            const totalPrice=orderItem.product.price*orderItem.quantity;
            return totalPrice;
        }))

        const totalPrices=totalPrice.reduce((sum,ele)=>sum+=ele,0)

        let order=await new Orders({
            orderItems:orderItemIdsResolve,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:totalPrices,
            user:req.body.user,
            dateOrdered:req.body.dateOrdered,
        })
        order=await order.save()
        if(!order){
            res.status(401).json({result:"order cannot be created"})
        }
        // res.status(201).json({result:order})
        res.send(category)    

    }catch(e){
        console.log(e)
        res.json({error:e})
    }
   
}

exports.getTotalSales=async(req,res)=>{
    const totalSales=await Orders.aggregate([
       {
        $group:{_id:null,totalsales:{$sum:'$totalPrice'}}
       } 
    ])
    if(!totalSales){
        return res.status(404).send("orders cannot be generated")
    }
    res.send({totalSales:totalSales.pop().totalsales})
}

exports.getOrderCount=async(req,res)=>{
    try{
        const orderCount=await Orders.countDocuments('_id') ;
        if(!orderCount){
            res.status(500).json({success:false})
        }
    res.json({count:orderCount})
    }catch(e){
        res.status(400).json({error:e})
        console.log(e)
    }  
}



exports.deleteOrders=async(req,res)=>{
    try{
        const {id}=req.params
        const result=await Orders.findByIdAndRemove(id)
        if(result){
            await result.orderItems.map(async orderItem=>{
                await OrderItems.findByIdAndRemove(orderItem)
            })
            return res.json({message:"successfull",success:true})
        }else{
            return res.json({message:"error in delete method",success:false})
        }
    }catch(e){
        console.log(e)
        res.json({error:e})
    }
}

exports.updateOrders=async(req,res)=>{
    try{
        const id =req.params.id
        const orders=await Orders.findByIdAndUpdate(id,{
            status:req.body.status,
        }, {new:true}//indicates taht we want to return new updated data
        )
        if(!orders){
            res.status(401).json({result:"orders cannot be created"})
        }
        // res.status(201).json({result:orders})
        res.send(orders)    

    }catch(e){
        console.log(e);
        res.status(500).send("error while updating")
    }
}


exports.getUserOrders=async(req,res)=>{
    const UserOrderList=await Orders.find({user:req.params.id}).populate({
        path:'orderItems',populate:{
            path:'product',populate:'category'}
        }).sort({'dateOrdered':-1})
    if(!UserOrderList){
        res.status(500).json({success:false})
   }
   res.send(UserOrderList)
}
