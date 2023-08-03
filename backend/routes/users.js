const express=require('express')

const routes=express.Router()

const users=require('../controllers/users')

routes.get('/',users.getUsers)
routes.get('/:id',users.getSingleUser)
routes.post('/signup',users.postUser)
routes.post('/login',users.loginUser)
routes.get('/get/count',users.getUserCount)
routes.delete('/:id',users.deleteUser)

module.exports=routes