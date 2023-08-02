const express=require('express')
const routes=express.Router()


const category=require('../controllers/category')

routes.get('/',category.getCategory)
routes.post('/',category.postCategory)
routes.delete('/:id',category.deleteCategory)
routes.get('/:id',category.getSingleCategory)
routes.put('/:id',category.updateCategory)
module.exports=routes