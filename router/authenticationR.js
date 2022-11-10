
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const authS = require('../models/authS')


router.post('/signin',async (req,res)=>{
    
   
        const {phone,password} = req.body;
        try{
         let user = await authS.findOne({phone});
         if(!user){
             res.status(400).json({errors:[{msg:'Invalid credentials'}]})
         }
     
         const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch){
             res.status(400).json({errors:[{msg:'Invalid credentials'}]})
         }
        
         const payload ={
             user:{
                 id:user.id
             }
         }
         jwt.sign(payload,"secretkey",{expiresIn:3000000}
         ,(err,token)=>{
             if(err) throw err;
             res.json({token});
         })
     
        }catch(err){
         console.log(err)
     
        }
     
         //see if users exists
     
         // get users avatar
     
         //encrypt password
     
         //return jsonwebtoken
         // res.send('User Route')
 })
    

 router.post('/signup',async (req,res)=>{
    
     const {name,phone,password} = req.body;
    try{
     let user = await authS.findOne({phone});
     if(user){
         res.status(400).json({errors:[{msg:'User already exists'}]})
     }
    
     user = new authS({
         name,phone,password
     });
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password,salt);
 
     await user.save();
 
     const payload ={
         user:{
             id:user.id
         }
     }
     jwt.sign(payload,"secretkey",{expiresIn:360000}
     ,(err,token)=>{
         if(err) throw err;
         res.json({token});
     })
 
    }catch(err){
     console.log(err)
 
    }
 
     //see if users exists
 
 
     // get users avatar
 
     //encrypt password
 
     //return jsonwebtoken
     // res.send('User Route')
 })

 module.exports= router

