const mongoose=require('mongoose')

const orderItemSchema=mongoose.Schema({

    quantity:{
        type:Number,
        require:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }

});

orderItemSchema.virtual('id').get(function(){
    this._id.toHexString();
});
orderItemSchema.set('toJSON',{
    virtuals:true
});

exports.OrderItems=mongoose.model('OrderItems',orderItemSchema)

