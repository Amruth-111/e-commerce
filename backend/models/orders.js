const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    

});

orderSchema.virtual('id').get(function(){
    this._id.toHexString();
});
orderSchema.set('toJSON',{
    virtuals:true
});

exports.Orders=mongoose.model('Orders',orderSchema)

