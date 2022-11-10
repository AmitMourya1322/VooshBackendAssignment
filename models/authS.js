const mongoose = require('mongoose');
const authSchema = new mongoose.Schema({
    phone: {
        type:Number,
        required:true,
        unique:true,

    },
      password: {
        type:String,
        required:true
      },
      name: {
        type:String,
        required:true
      },
     
},
{
  timestamps:true
})
const authS = mongoose.model('authS',authSchema);
module.exports= authS;