
const express=require('express')
const routes=express.Router()

const products=require('../controllers/products')
routes.get('/',products.getProduct)
routes.post('/',products.postProduct)
routes.get('/:id',products.getSingleProduct)
routes.put('/:id',products.updateProduct)
routes.delete('/:id',products.deleteProduct)
routes.get('/get/count',products.getProductCount)
routes.get('/get/featured/:count',products.getFeaturedProduct)

module.exports=routes