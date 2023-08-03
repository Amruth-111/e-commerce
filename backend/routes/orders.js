const express=require('express')
const routes=express.Router()


const orders=require('../controllers/orders')

routes.get('/',orders.getOrders)
routes.post('/',orders.postOrders)
routes.get('/:id',orders.getSingleOrders)
routes.put('/:id',orders.updateOrders)
routes.delete('/:id',orders.deleteOrders)
routes.get('/get/count',orders.getOrderCount)
routes.get('/get/totalsales',orders.getTotalSales)
routes.get('/get/userorder/:id',orders.getUserOrders)

module.exports=routes