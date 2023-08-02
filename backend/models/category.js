const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        
    },
})

categorySchema.virtual('id').get(function(){
    this._id.toHexString();
});
categorySchema.set('toJSON',{
    virtuals:true
});

exports.Category=mongoose.model('Category',categorySchema)

