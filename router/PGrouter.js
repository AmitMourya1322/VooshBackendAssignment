//post and get router

const Product = require('../models/Product');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const authS = require('../models/authS')

const auth = require('../middleware/auth')



router.post('/add-order', auth, async(req,res)=>{
    try {

        const user = await authS.findById(req.user.id).select('-password')
        const newPost= new Product({
            product: req.body.product,
            user:req.user.id
        })
    


       
       const post = await newPost.save();
        return res.status(200).json(post);
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/get-order/:id',auth, async (req,res)=>{
    try {
        let getOrder = await Product.findById(req.params.id);
        if(!getOrder){
            return res.status(404).json({msg:'Nothing is here'})
        }
        return res.status(200).json(getOrder);

    } catch (error) {
        console.log(error)
        
    }
})

module.exports = router;