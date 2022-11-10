const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'authS'
    }],
     
      product: {
        type:String,
        required:true
      },
     
},
{
  timestamps:true
})
const Product = mongoose.model('Product',ProductSchema);
module.exports= Product;