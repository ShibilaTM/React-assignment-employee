const mongoose= require('mongoose')
const formData = require('../model/formData')
const router = require('express').Router()
const cors= require('cors')
router.use(cors())
router.post('/add',async(req,res)=>{
    try {
        const data=req.body
        const form = await formData(data).save()
        res.status(200).json('successfully posted')
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get('/',async(req,res)=>{
    try{
        const data = await formData.find()
        res.status(200).json(data)
    }catch(error){
        console.log(error)
    }
})




module.exports=router