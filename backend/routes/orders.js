const express=require('express')
const routes=express.Router()


const orders=require('../controllers/orders')

routes.get('/',orders.getOrders)
routes.post('/',orders.postOrders)
routes.get('/:id',orders.getSingleOrders)
routes.put('/:id',orders.updateOrders)
routes.delete('/:id',orders.deleteOrders)

module.exports=routes