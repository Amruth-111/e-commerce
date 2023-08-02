const express=require('express')
const routes=express.Router()


const orders=require('../controllers/orders')

routes.get('/',orders.getOrders)

module.exports=routes