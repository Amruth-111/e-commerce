
const {User}=require('../models/users')

exports.getUsers=async(req,res)=>{
    const userList=await User.find();
    if(!userList){
        res.status(500).json({success:false})
   }
   res.send(userList)
}