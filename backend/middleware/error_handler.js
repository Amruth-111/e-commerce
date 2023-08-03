


function errorHandler(err,req,res,next){
    // if(err.name ==="UnauthorizedError"){
    //     return res.status(401).json({message:"there is an error in userauthentication" ,error:err})
    // }
    // if(err.name==="validationError"){
    //     return res.status(401).json({message:"there is an error in validation" ,error:err})
    // }
    if(err){
        res.status(501).json({message:"there is an error in userauthentication" ,error:err})
    }
    next;
    
}

module.exports=errorHandler