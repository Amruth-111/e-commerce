const express=require('express')

const routes=express.Router()

const users=require('../controllers/users')

routes.get('/',users.getUsers)
routes.get('/:id',users.getSingleUser)
routes.post('/',users.postUser)
routes.post('/login',users.loginUser)
module.exports=routes