
const {User}=require('../models/users')
const bcrypt=require('bcrypt')

exports.getUsers=async(req,res)=>{
    const userList=await User.find();
    if(!userList){
        res.status(500).json({success:false})
   }
   res.send(userList)
}

exports.postUser=async(req,res)=>{
    try{
        let user=await new User({
            name:req.body.name,
            email:req.body.email,
            passwordHash:bcrypt.hashSync(req.body.passwordHash,10),
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            apartment:req.body.apartment,
            zip:req.body.zip,
            city:req.body.city,
            country:req.body.country,

        })
        user=await user.save()
        if(!user){
            res.status(401).json({result:"category cannot be created"})
        }
        // res.status(201).json({result:category})
        res.send(user)    

    }catch(e){
        console.log(e)
        res.json({error:e})
    }
   
}